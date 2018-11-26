define(['tiles/Square', 'ui/home/buildings/makeBuildingUIWindow'], 
	function(Square, makeBuildingUIWindow){

	return class Civic extends Square {
		constructor(x, y, grid, terrain){
			super(x, y, grid, terrain);
			this.building = null;
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
			this.ongoingConstruction = false;
			this.home = grid.home;
		}

		build(building){
			if (this.canBuild(building)){
				this.ongoingConstruction = true;
				this.home.startConstruction(building, this);
				return true;
			} 
			return false;
		}

		//pays the price if possible and returns true, otherwise returns false
		canBuild(buildingType, level = 0){
			return this.home
				.extractCost(this.home.getBuildingCost(buildingType, level) 
			);
		}

		upgrade(buildingType, level) {
			if (this.canBuild(buildingType, level)){
				this.ongoingConstruction = true;
				this.home.startConstruction(buildingType, this, level, true); 
				return true;
			}
			return false;
		}

		finishConstruction(building){
			return this.setBuilding(building);
		}

		finishUpgrade(building) {
			return this.setBuilding(building);
		}

		setBuilding(building) {
			const formerBuilding = this.building;
			this.ongoingConstruction = false;
			this.building = building;
			return formerBuilding;
		}

		showOptions(){
			if (this.ongoingConstruction) {
				console.log("show an ongoing construction window");
			} else if (!this.building) {
				this.grid.game.infoWindow.openWith(
					makeBuildingUIWindow(this, this.home.getBuildingsAvailableToBuild()), this); 
			} else {
				this.building.openUI(this.grid.game.infoWindowLayer);
			}
			
		}

		setListener(){
			this.ui.interactive = true;
			this.ui.on('click', this.showOptions.bind(this));
		}
		
		takeTurn(){
			this.render();
			if (this.building) {
				this.building.takeTurn();
			}
		}
		render(){
			this.getNeighbors().forEach(a=>{
				let tile = this.grid.getTile(a[0], a[1]);
				if (tile.type === 'wilds') {
					tile.markAsExplored();
				}
			})
			this.ui.tint = 0xEEDD33;
		}
	}

	
})


