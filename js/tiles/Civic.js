define(['tiles/Square', 'ui/home/buildings/makeBuildingUIWindow'], 
	function(Square, makeBuildingUIWindow){

	return class Civic extends Square {
		constructor(x, y, grid, terrain){
			super(x, y, grid, terrain);
			this.building = null;
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
			this.ongoingConstruction = null;
		}

		build(building){
			if (this.canBuild(building)){
				this.grid.home.buildingManager.startConstruction(building, this);
				return true;
			} 
			return false;
		}

		//pays the price if possible and returns true, otherwise returns false
		canBuild(buildingType, level = 0){
			return this.grid.home
				.extractCost(this.grid.home.buildingManager
				.getBuildingCost(buildingType, level)
			);
		}

		upgrade(buildingType, level) {
			if (this.canBuild(buildingType, level)){
				this.grid.home.buildingManager.startConstruction(buildingType, this, level, true);
				return true;
			}
			return false;
		}

		finishConstruction(building){
			this.building = building;
			this.ui.addChild(building.ui); //this won't work for upgrading... (need to replace the current building UI)
		}

		showOptions(){
			if (!this.building) {
				this.grid.game.infoWindow.openWith(
					makeBuildingUIWindow(this, this.grid.home.buildingManager.getBuildingCost()), this)
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


