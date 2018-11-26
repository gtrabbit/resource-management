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
				this.fontStyle = grid.game.basicFontStyle;
			}

		getNeighbors(){
			return this.neighbors;
		}

		makeUI(){			
			const uiContainer = makeTileUI(this);
			this.ui = uiContainer.children[0]
			this.setListener();
			return uiContainer;
		}

		setListener(){

		}

		takeTurn() {
			
		}

		getSpritePosition(){
			return {
				x: this.ui.parent.x,
				y: this.ui.parent.y
			}
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