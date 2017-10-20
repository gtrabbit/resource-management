define(['core/Wilds', 'home/Home', 'core/Civic'], function(Wilds, Home, Civic){
	return class Grid{
		constructor(height, width, growthRate, homeStart){
			this.height = height;
			this.width = width;
			this.rows = [];
			this.growthRate = growthRate;
			this.buildMap();
			this.home = this.makeHome(homeStart, homeStart.map(a=>a+1));
		}

		makeHome(homeStart, homeEnd){
			let home = new Home(homeStart, homeEnd, {'food': 5});
			for (let x = homeStart[0]; x <= homeEnd[0]; x++){
				for (let y = homeStart[1]; y <= homeEnd[1]; y++){
					let starter = new Civic(x, y, this.width, this.height);
					home.territory.push(starter);
					this.convertTile([x,y], starter)
				}
			}
			home.territory[0].build('farm');
			return home
		}

		convertTile(coords, tile){
			this.rows[coords[0]].splice(coords[1], 1, tile);
		}

		getContainer(){
			return this.container;
		}

		update(){
			for (let col in this.rows){
				for (let square in this.rows[col]){
					this.updateTile(this.rows[col][square]);
				}
			}
		} // ends update function


// TODO: Store the functions for each switch case in individual files

		updateTile(tile){
			switch(tile.type){
				case 'wilds':
					let chance = 0;
					tile.getNeighbors().forEach((a) => {
						let square = this.rows[a[0]][a[1]];
						chance += square.hasOwnProperty('dangerValue') ? square.getDanger() : 1;	
						})
					if (chance > (Math.random() * (tile.growthRate * 40)) + 7.5) tile.setDanger(this.getDanger() + 1);
					break;

				case 'civic':
					switch(this.usage){
						case 'farm':
							this.home.addResource('food', 1);
							break;
						default:
							break;
					}

					break;
				default:
					return;
			}
		}

		buildMap(){
			for (let x = 0; x < this.width; x++){
				let col = [];
				this.rows.push(col)
				for (let y = 0; y < this.height; y++){
					let square = new Wilds(x, y, this.height, this.width, this.growthRate);
					col.push(square);
				}	
			}
		} //ends build
	}
})