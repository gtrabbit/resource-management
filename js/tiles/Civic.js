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

		canBuild(building){
			return this.grid.home
				.extractCost(this.grid.home.buildingManager
				.getBuildingCost(building));
		}

		finishConstruction(building){
			this.building = building;
			this.ui.addChild(building.ui);
		}

		showOptions(){
			this.grid.game.infoWindow.openWith(
				makeBuildingUIWindow(this, this.grid.home.buildingManager.costs), this)
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


