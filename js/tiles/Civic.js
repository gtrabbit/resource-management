define(['tiles/Square'], function(Square){
	return class Civic extends Square {
		constructor(x, y, grid, terrain){
			super(x, y, grid, terrain);
			this.usage = 'field';
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
		}

		build(structure){
			this.usage = structure;
		}

		takeTurn(){
			this.getNeighbors().forEach(a=>{
				let tile = this.grid.getTile(a[0], a[1]);
				tile.isExplored = true;
			})
			this.render();
		}

		render(){
			this.ui.alpha = 1;
		}

		setListener(){
			this.ui.interactive = true;
			this.ui.on('pointerup', ()=>{console.log(this)});
		}
	}

	
})


