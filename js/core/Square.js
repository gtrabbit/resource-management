define(['core/Game', 'libs/pixi.min'], function(Game){
	return class Square {
		constructor(x, y, grid, terrainType){
				this.coords = [x, y];
				this.UID = "" + x + y;
				this.grid = grid;
				this.maxWidth = grid.width;
				this.maxHeight = grid.height;
				this.neighbors = this.setNeighbors(x, y);
				this.terrain = terrainType;
				this.isExplored = false;
				this.squareSize = 16;
			}

		getNeighbors(){
			return this.neighbors;
		}

		makeUI(){

			let ui = new PIXI.Graphics();

			switch(this.terrain){
				case 'field':
					ui.beginFill(0xbab521); //yellowish
					break;

				case 'forest':
					ui.beginFill(0x196817); //greenish
					break;

				case 'hills':
					ui.beginFill(0x72613d);  //brown-grey
					break;
			}


			ui.lineStyle(1, 0x000, 1);
			ui.drawRect(
				0,
				0,
				this.squareSize,
				this.squareSize)

			ui.endFill();
			ui.x = this.coords[0]*this.squareSize;
			ui.y = this.coords[1]*this.squareSize;


			let dot = new PIXI.Graphics();
			dot.beginFill(0xFF0000);
			
			dot.drawCircle(0, 0, 2);
			dot.endFill();
			dot.alpha = 0;
			dot.x = 5;
			dot.y = 5;
			ui.addChild(dot)
			this.ui = ui;
			this.setListener()
		}

		setListener(){
			
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