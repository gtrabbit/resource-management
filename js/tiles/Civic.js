define(['tiles/Square', 'ui/home/buildings/makeBuildingUIWindow'], 
	function(Square, makeBuildingUIWindow){

	return class Civic extends Square {
		constructor(x, y, grid, terrain){
			super(x, y, grid, terrain);
			this.building = null;
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
		}

		build(building){
			if (this.canBuild(building)){
				this.grid.home.buildingManager.startConstruction(building, this);
				return true;
			} 
			return false;
		}

		takeTurn(){
			this.render();
		}

		canBuild(building){
			if (this.grid.home.extractCost(this.grid.home.buildingManager.getBuildingCost(building))){
				return true;
			}
			return false;			
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

		showOptions(){
			this.grid.game.infoWindow.openWith(makeBuildingUIWindow(this, this.grid.home.buildingManager.costs), this)
		}

		setListener(){
			this.ui.interactive = true;
			this.ui.on('pointerup', this.showOptions.bind(this));
		}
	}

	
})


