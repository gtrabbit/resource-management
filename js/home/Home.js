define(['tiles/Civic', 'ui/homedisplay', 
	  'utils/cloneObject', 'home/citizens/artisan',
	 'home/citizens/commoner', 'home/citizens/farmer', 'home/citizens/militia',
	 'home/citizens/woodsman',], 
	function(Civic, homeDisplay, cloneObject,
			Artisan, Commoner, Farmer, Militia, Woodsman){

	return class Home {
		constructor(grid, startingResources, startingPopulation, popGrowth, territory){
			this.territory = territory || [];
			this.resources = startingResources;
			this.grid = grid;
			this.game = grid.game
			this.baseDefense = 10;   // calculated property based on buildings / tech / etc. => not state
			this.population = startingPopulation;
			this.population.militiaAvailable = startingPopulation.militia;
			this.caps = {  // this will be a calculated property, so not part of state...
				'farmers': 10,
				'artisans': 5,
				'woodsmen': 8,
				'militia': 5,
				'militiaAvailable': Infinity,
				'commoners': Infinity,
				'total': 50
			}
			this.citizens = {
				artisans: new Artisan(null),
				commoners: new Commoner(null),
				farmers: new Farmer(null),
				militia: new Militia(null),
				woodsmen: new Woodsman(null)
			}

			this.display = homeDisplay();
			this.game.stage.addChild(this.display.container);
		}

		extractState(){
			return {
				population: this.population,
				territory: this.territory,
				resources: this.resources				
			}
		}

		addResource(typeAmount){
			Object.keys(typeAmount)
				.forEach(a=>{
						this.resources[a] += typeAmount[a];
				})
			if (this.popGrowth > 1) {
				this.popGrowth--;
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

		extractCost(cost){  //returns false (with no side effects) if all resources are not available
			let total = {};
			
			for (let key in cost){
				if (this.resources[key] >= cost[key]){
					if (cost[key] < 0) total[key] = cost[key];
				} else {
					return false
				}
			}
			this.addResource(total);
			return true;
		}

		disband(citizen){
			this.population[citizen]--;
			if (citizen !== 'commoner')	this.population.commoners++;
			this.updateDisplay();
		}

		getTotalPopulation(){
			return Object.keys(this.population)
				.reduce((a, b)=>(a+this.population[b]), 0)
		}

		modifyPopulace(type, amount){
			if (this.caps[type] > this.population[type]
				&& this.caps.total > this.getTotalPopulation() - this.population.militia){ 

				this.population[type] += amount;
				this.updateDisplay();
			} else {
				return false;
			}	
		}

		update(turnNumber){
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
					this.population.militiaAvailable = this.population.militia;
				}	
			}

			this.display.summarizeGrowth([this.getAllResources(), this.getAllPopulation()], [this.resources, this.population])
				.forEach(a=>this.game.addEvent(a));
			this.determineLosses(popDef + this.baseDefense);
		}

		updateDisplay(){
			const numbers = {...this.population, ...this.resources};
			Object.keys(numbers).forEach(a=>{
				if (this.display.hasOwnProperty(a))
					this.display[a].text = this.display[a].text.replace(/\d+/, numbers[a])
			})
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
						tile.isExplored = true;
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

