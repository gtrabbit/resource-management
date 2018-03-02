define(['tiles/Square'], function(Square){
	return class Civic extends Square {
		constructor(x, y, grid, terrain){
			super(x, y, grid, terrain);
			this.usage = 'field';
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
		}

		build(building){
			this.usage = building;
			this.grid.home.buildings.constructBuilding(building, this)
		}

		takeTurn(){
			this.getNeighbors().forEach(a=>{
				let tile = this.grid.getTile(a[0], a[1]);
				tile.isExplored = true;
			})
			this.render();
		}

		render(){
			this.ui.tint = 0xFFFFFF;
		}

		setListener(){
			this.ui.interactive = true;
			this.ui.on('pointerup', ()=>{console.log(this)});
		}
	}

	
})


