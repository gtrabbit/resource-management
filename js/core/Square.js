define(['core/Game', 'libs/pixi.min'], function(Game){
	return class Square {
		constructor(x, y, maxWidth, maxHeight, terrainType){
				this.coords = [x, y];
				this.UID = "" + x + y;
				this.maxWidth = maxWidth;
				this.maxHeight = maxHeight;
				this.neighbors = this.setNeighbors(x, y);
				this.terrain = terrainType;
				this.isExplored = false;
				this.squareSize = 9;
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

			ui.lineStyle(1, 0xFFFFFF, 0.5);
			ui.drawRect(
				this.coords[0]*this.squareSize,
				this.coords[1]*this.squareSize,
				this.squareSize,
				this.squareSize)
			ui.endFill();
			this.ui = ui;
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