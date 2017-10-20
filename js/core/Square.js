define(['core/Game'], function(Game){
	return class Square {
		constructor(x, y, maxWidth, maxHeight){
				this.coords = [x, y];
				this.UID = "" + x + y;
				this.maxWidth = maxWidth;
				this.maxHeight = maxHeight;
				this.neighbors = this.setNeighbors(x, y);
			}

			getNeighbors(){
				return this.neighbors;
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