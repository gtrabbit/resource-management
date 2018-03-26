define(['tiles/Civic', 'ui/home/resAndPopDisplay', 
	  'utils/cloneObject', 'utils/compareObjects', 'home/citizens/artisan',
	 'home/citizens/commoner', 'home/citizens/farmer', 'home/citizens/militia',
	 'home/citizens/woodsman', 'events/citizenConversion', 'ui/home/citizenManagementDisplay',
	 'home/buildings/buildingManager', 'tiles/tileFactory'], 
	function(Civic, homeDisplay, cloneObject, compareObjects,
			Artisan, Commoner, Farmer, Militia, Woodsman, citizenConversion,
			citizenManager, BuildingManager, TileFactory){

	return class Home {
		constructor(grid, startingResources, startingPopulation, popGrowth, territory, homeStart, homeEnd){
			this.territory = territory || [];
			this.resources = startingResources;
			this.grid = grid;
			this.game = grid.game
			this.baseDefense = 10;   // calculated property based on buildings / tech / etc. => not state
			this.population = startingPopulation;
			this.population.militiaAvailable = startingPopulation.militia;
			
			this.basePopulationCaps = {  
				'farmers': 5,
				'artisans': 2,
				'woodsmen': 3,
				'militia': 3,
				'militiaAvailable': Infinity,
				'commoners': 10,
				'total': 10
			}
			this.caps = {}; // this will be a calculated property, so not part of state...
			
			this.citizens = {
				artisans: new Artisan(null),
				commoners: new Commoner(null),
				farmers: new Farmer(null),
				militia: new Militia(null),
				woodsmen: new Woodsman(null)
			}
			this.display = homeDisplay();
			this.citizenManager = citizenManager(this.game.screenWidth, this.game.screenHeight, this.convertCitizen.bind(this), this.disband.bind(this));
			this.game.overlays.addChild(this.display.container, this.citizenManager);
			this.setInitialTerritory(homeStart, homeEnd);
			this.buildingManager = new BuildingManager(this);			
		}

		extractState(){
			return {
				population: this.population,
				territory: this.territory,
				resources: this.resources			
			}
		}

		setInitialTerritory(homeStart, homeEnd){
			for (let x = homeStart[0]; x <= homeEnd[0]; x++) {
				for (let y = homeStart[1]; y <= homeEnd[1]; y++) {
					let starter = TileFactory(
						'civic', x, y, this.grid, this.grid.rows[x][y].terrain)
					this.grid.replaceTile(x, y, starter)
					this.territory.push(starter); //any call subsequent to this should use public method
				}
			}
		}

		addTileToTerritory(tile){
			this.territory.push(tile);
			tile.render();
		}

		setPopulationCaps(newCaps){
			this.caps = newCaps;
			this.updateDisplay(true, newCaps);
		}

		setInitialBuildings(){
			this.buildingManager.finishConstruction(this.buildingManager.makeBuilding('farm', this.territory[0]), this.territory[0]);
		}

		addResource(typeAmount){
			Object.keys(typeAmount)
				.forEach(a=>{
						this.resources[a] += typeAmount[a];
				})
			if (this.resources.popGrowth > 1) {
				this.resources.popGrowth--;
				this.modifyPopulace('commoners', 1);
			}
			this.updateDisplay(); 
		}

		getResources(type){
			return this.resources[type];
		}

		getAllResources(){
			return cloneObject(this.resources);
		}

		getAllPopulation(){
			return cloneObject(this.population);
		}

		getPopulationCap(type) {
			return this.caps + this.buildingManager.getCapAdjustment(type);
		}

		extractCost(cost){  //returns false (with no side effects) if all resources are not available
			let total = {};
			
			for (let key in cost){
				if (cost.hasOwnProperty(key)){
					if (this.resources[key] >= -cost[key]){
						if (cost[key] < 0) total[key] = cost[key];
					} else {
						return false
					}
				}

			}
			this.addResource(total);
			return true;
		}

		disband(citizen){
			this.population[citizen]--;
			if (citizen !== 'commoners')	this.population.commoners++;
			this.updateDisplay();
		}

		convertCitizen(fromType, targetType, givenAmount){
			const amount = givenAmount || 1;
			if (this.canConvertCitizenTo(targetType, amount)){
				this.modifyPopulace(fromType, -amount);
				this.game.addEvent(citizenConversion(this.citizens[fromType], this.citizens[targetType], this.modifyPopulace.bind(this), amount));
				this.updateDisplay();
			} else {
				console.log("hey. can't do that. Sorry")
			}			
		}

		canConvertCitizenTo(type, amount){
			return this.caps[type] >= this.population[type] + amount
				&& this.caps.total >= this.getTotalPopulation() + amount - this.population.militia
				&& this.population['commoners'] > 1; 
		}

		getTotalPopulation(){
			return Object.keys(this.population)
				.reduce((a, b)=>(a+this.population[b]), 0)
		}

		modifyPopulace(type, amount){
			if (this.canConvertCitizenTo){
				this.population[type] += amount;
				if (type === 'militia') {
					this.population.militiaAvailable += amount;
				}
				this.updateDisplay();
				return true;
			} else {
				return false;
			}	
		}

		update(turnNumber){
			const oldResources = this.getAllResources();
			const oldPopulation = this.getAllPopulation();
			let popDef = 0;
			for (let key in this.population){
				if (key !== 'militiaAvailable'){
					for (let x = 0; x < this.population[key]; x++) {
						if (this.extractCost(this.citizens[key].costs)) {
							this.addResource(this.citizens[key].benefits)
							popDef += key === 'militia' ? 4 : 0;
							popDef += key === 'woodsmen' ? 1 : 0;
						} else {
							this.disband(key)
						}
					}
				} else {
					//this.population.militiaAvailable = this.population.militia;
				}	
			}

			this.display.summarizeGrowth(compareObjects(oldResources, this.resources), compareObjects(oldPopulation, this.population))
				.forEach(a=>this.game.addEvent(a));
			this.determineLosses(popDef + this.baseDefense);
			this.updateDisplay();
		}

		updateDisplay(changeToTotals, newValues){
			const updateValue = newValues ? newValues : {...this.population, ...this.resources};
			this.display.update(updateValue, changeToTotals);
		}
		
		determineLosses(def){
			//need to flesh this out
			this.findPerimeterDanger(this.territory)
		}

		findPerimeterDanger(territory){
			const surroundingSquares = {};
			territory.forEach(a=>{
				let individualDanger = 0;
				a.getNeighbors().forEach(a=>{
					let tile = this.grid.rows[a[0]][a[1]];
					if (tile.type === 'wilds'){
						surroundingSquares[tile.UID] = tile.getDanger();
						individualDanger += tile.getDanger();
					}	
				})
				a.currentThreat = individualDanger;
			})
			let total = 0;
			for (let key in surroundingSquares){
				total += surroundingSquares[key];
			}
			return total;
		}
	}
})

