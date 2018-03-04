define(['core/Game', 'ui/map/baseTileUI'], function(Game, makeTileUI){
	return class Square {
		constructor(x, y, grid, terrainType){
				this.x = x;
				this.y = y;
				this.UID = "" + x + y;
				this.grid = grid;
				this.maxWidth = grid.width;
				this.maxHeight = grid.height;
				this.neighbors = this.setNeighbors(x, y);
				this.terrain = terrainType;
				this.isExplored = false;
				this.squareSize = grid.squareSize;
			}

		getNeighbors(){
			return this.neighbors;
		}

		makeUI(){
			this.ui = makeTileUI(this).children[0];
			this.setListener()
		}

		setListener(){

		}

		getDanger(){
			return 0;
		}

		setNeighbors(x, y){
			let neighbors = [];
			for (let j = x-1; j <= x+1; j++){
				for (let k = y-1; k <= y+1; k++){
					if (j >= 0 && j < this.maxWidth){
						if (k >= 0 && k < this.maxHeight){
							if (!(x === j && y === k)){
								neighbors.push([j, k]);
							}
						}
					}
				}
			}
			return neighbors;	
		}
	}
})