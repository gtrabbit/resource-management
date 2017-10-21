define(['core/Civic'], function(Civic){

	return class Home {
		constructor(grid, topLeft, botRight, startingResources){
			this.territory = [];
			this.resources = startingResources;
			this.grid = grid;
			this.baseDefense = 10;
		}

		addResource(type, amount){
			this.resources[type] += amount;
		}

		getResources(type){
			return this.resources[type];
		}

		findPerimeterDanger(territory){
			const surroundingSquares = {};
			territory.forEach(a=>{
				let individualDanger = 0;
				a.getNeighbors().forEach(a=>{
					let tile = this.grid.rows[a[0]][a[1]];
					if (tile.type === 'wilds'){
						surroundingSquares[tile.UID] = tile.getDanger();
						individualDanger += tile.getDanger();
						tile.isExplored = true;
					}
					
				})
				a.currentThreat = individualDanger;
			})
			let total = 0;
			for (let key in surroundingSquares){
				total += surroundingSquares[key];
			}
			return total;


		}


	}
})

