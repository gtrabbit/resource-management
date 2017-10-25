define(['core/Square', 'core/Civic'], function(Square, Civic){
	return class Wilds extends Square{
			constructor(x, y, grid, terrain, growthRate){
				super(x, y, grid, terrain);
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

			setListener(){
				this.ui.on('pointerup', this.showOptions.bind(this));
			}

			showOptions(){
				console.log('click!')
				let starter = new Civic(
						this.coords[0],
					 	this.coords[1],
					 	this.grid,
					 	this.terrain);
				this.grid.convertTile(this.coords, starter);
				this.grid.game.update();
			}

			render(){
				if (!this.isExplored){
					this.ui.alpha = 0.2
				} else {
					this.ui.alpha = 0.5;
					this.ui.interactive = true;
					this.ui.buttonMode = true;
				}

				this.ui.children[0].alpha = this.getDanger()/20;
			}

		}
})