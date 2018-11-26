define(['ui/home/resAndPopDisplay', 'utils/sumObjects', 'utils/cloneObject', 'utils/compareObjects',
	 'events/citizenConversion', 'ui/home/citizenManagementDisplay', 'home/buildingManager',
	 'tiles/tileFactory', 'home/populationManager',	'events/construction', 'home/defenseManager'], 
	function(homeDisplay, sumObjects, cloneObject, compareObjects, citizenConversion,
			citizenManagerDisplay, BuildingManager, TileFactory, PopulationManager,
			Construction, DefenseManager){

	return class Home {
		constructor(grid, startingResources, startingPopulation, popGrowth, territory){
			this.territory = territory || [];
			this.resources = startingResources;
			this.grid = grid;
			this.game = grid.game;
			this.population = startingPopulation;
			this.population.militiaAvailable = startingPopulation.militia;
			this.display = homeDisplay();
			this.citizenManagerDisplay = citizenManagerDisplay(this.game.screenWidth, this.game.screenHeight,
				this.convertCitizen.bind(this), this.disband.bind(this));
			this.buildingManager = new BuildingManager(this);		
			this.populationManager = new PopulationManager(this, startingPopulation);
			this.defenseManager = new DefenseManager(this);
		}

		extractState(){
			return {
				population: this.getAllPopulation(),
				territory: this.territory,
				buildings: this.getAllBuildings(),
				resources: this.getAllResources()
			}
		}

		init(homeStart, homeEnd) { //consider following comment on line 53 now that this is here...
			this.game.overlays.addChild(this.display.container, this.citizenManagerDisplay);
			this.setInitialTerritory(homeStart, homeEnd);
			this.setInitialBuildings();
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

		disband(citizenTypeName){ 
			this.populationManager.disband(citizenTypeName);
			this.updateDisplay();
		}

		setPopulationCaps(newCaps){  
			const updatedCaps = this.populationManager.setPopulationCaps(newCaps);
			this.updateDisplay();
			return updatedCaps;
		}

		modifyPopulationCaps(typeAmount) {
			this.populationManager.modifyPopulationCaps(typeAmount);
			this.updateDisplay();
			return true;
		}

		getPopulationCaps(type) {
			return this.populationManager.getPopulationCaps(type);
		}

		getAllPopulation(){
			return this.populationManager.getAllPopulation();
		}

		setInitialBuildings(){
			this.buildingManager.finishConstruction(this.buildingManager.makeBuilding('farm', this.territory[0]), this.territory[0]);
			this.buildingManager.finishConstruction(this.buildingManager.makeBuilding('greatHall', this.territory[4]), this.territory[4]);
			this.buildingManager.finishConstruction(this.buildingManager.makeBuilding('house', this.territory[2]), this.territory[2]);
			this.buildingManager.finishConstruction(this.buildingManager.makeBuilding('tower', this.territory[7]), this.territory[7]);
		}

		addResource(typeAmount){
			Object.keys(typeAmount)
				.forEach(a=>{
					this.resources[a] += a === 'popGrowth' ? typeAmount[a] : Math.round(typeAmount[a]);
				});
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

		getAllBuildings() {
			return this.buildingManager.getAllBuildings();
		}

		extractCost(cost){  //returns false (with no side effects) if all resources are not available
			let total = {};			
			for (let key in cost){
				if (cost.hasOwnProperty(key)){
					if (this.resources[key] >= -cost[key]){
						if (cost[key] < 0) total[key] = cost[key];
					} else {
						return false;
					}
				}
			}
			this.addResource(total);
			return true;
		}

		convertCitizen(fromType, targetType, givenAmount = 1){
			if (this.populationManager.convertCitizen(fromType, targetType, givenAmount)) {
				this.game.addEvent(citizenConversion(this.populationManager.getCitizenTypes(fromType), this.populationManager.getCitizenTypes(targetType), this.modifyPopulace.bind(this), givenAmount));
				this.updateDisplay();
			} else {
				console.log("hey. can't do that. Sorry", fromType, targetType, givenAmount);
			}
		}

		getTotalPopulation(){
			return this.populationManager.getTotalPopulation();
		}

		getNonMilitaryPopulationTotal() {
			return this.populationManager.getNonMilitaryPopulation();
		}

		modifyPopulace(type, amount){
			if (this.populationManager.modifyPopulace(type, amount)) {
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
			let gain = {};
			for (let citizenType in oldPopulation){
				if (citizenType !== 'militiaAvailable'){
					for (let x = 0; x < oldPopulation[citizenType]; x++) {
						let citizen = this.populationManager.getCitizenTypes(citizenType);
						if (this.extractCost(citizen.getCosts())) {
							let buildingToUse = this.buildingManager.getNextAvailableBuilding(citizen.getBuildingType());
							let resourcesGained = buildingToUse ? citizen.takeTurn(buildingToUse.getYield()) : citizen.takeTurn();
							if (resourcesGained.hasOwnProperty('resources')) {
								gain = sumObjects(resourcesGained.resources, gain);								
							}
							popDef += resourcesGained.hasOwnProperty('defense') ? resourcesGained.defense : 1;							
						} else {
							this.populationManager.disband(citizenType);
						}
					}
				} else {
					//this.population.militiaAvailable = this.population.militia;
				}	
			}
			this.addResource(gain);
			this.display.summarizeGrowth(compareObjects(oldResources, this.resources), compareObjects(oldPopulation, this.population))
				.forEach(a=>this.game.addEvent(a));
			this.defenseManager.determineLosses(popDef);
			this.buildingManager.update();
			this.updateDisplay();
		}

		updateDisplay(){
			let newValues = {...this.getAllPopulation(), ...this.getAllResources(), citizenTotal: this.getNonMilitaryPopulationTotal(), ...this.getPopulationCaps()};			
			this.display.update(newValues);
		}

		startConstruction(buildingType, tile, level, isUpgrade) {
			const building = this.buildingManager.startConstruction(buildingType, tile, level, isUpgrade);
			return this.game.addEvent(new Construction(building, tile, isUpgrade));
		}
		
		getBuildingCost(buildingType, level) {
			return this.buildingManager.getBuildingCost(buildingType, level);
		}

		getAllBuildingCosts() {
			return this.buildingManager.getAllBuildingCosts();
		}

		getBuildingsAvailableToBuild() {
			const state = {home: this.extractState()};
			return this.buildingManager.getBuildingsAvailableToBuild(state);
		}

		modifyDefense(newValue) {
			return this.defenseManager.modifyDefense();
		}

	}
})

