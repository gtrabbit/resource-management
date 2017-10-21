define(['core/Square'], function(Square){
	return class Wilds extends Square{
			constructor(x, y, maxWidth, maxHeight, terrain, growthRate){
				super(x, y, maxWidth, maxHeight, terrain);
				this.dangerValue = 1;
				this.growthRate = growthRate;
				this.type = "wilds"
			}


			getDanger(){
				return this.dangerValue;
			}

			setDanger(value){
				this.dangerValue = value;
			}

			takeTurn(){
				
				this.render();
			}

		}
})