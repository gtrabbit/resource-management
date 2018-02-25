define({
	terrainTypes: [
		'field',
		'forest',
		'hills'
	],

	generateTerrain(grid){
		let size = grid.length * grid.length;
		grid = this.firstIteration(grid, size);

		let totalHills = 0;
		let totalForests = 0;
		for (let x = 0; x < 5; x++){
			grid.forEach((a,j)=>{
				a.forEach((b,k)=>{
					let neighbors = b.getNeighbors();
					let environs = {
						forest: 0,
						hills: 0,
						field: 0,
					}
					neighbors.forEach(n=>{
						environs[grid[n[0]][n[1]].terrain]++;
					})
					if (environs.hills > 3){
						b.terrain = 'hills';
						b.dangerValue = 3;
					} else if (x > 2 && b.terrain === 'hills' && environs.forest > 2){
						b.terrain = 'forest';
						b.dangerValue = 2;
					} else if (environs.forest > 5){
						b.terrain = 'forest';
						b.dangerValue = 2;
					} else if (x > 2 && environs.field > 4 || x > 4){
						b.terrain = 'field'
						b.dangerValue = 1;
					}
				})
			})
		}
		this.checkMap(grid, size)
	},


	checkMap(grid, size){
		let environs = {
						forest: 0,
						hills: 0,
						field: 0,
					}
		grid.forEach(a=>{
			a.forEach(b=>{
				environs[b.terrain]++;
			})
		})

		if (environs.forest < size/7 || environs.hills < size/9){
			this.resetAll(grid);
			this.generateTerrain(grid);
		}
	},

	resetAll(grid){
		console.log('infinite loop?')
		grid.forEach(a=>{
			a.forEach(b=>{
				this.resetTile(b);
			})
		})
	},

	resetTile(tile){
		tile.terrain = 'field'
	},

	firstIteration(grid, size){
		let hills = forests = field = 0;
		grid.map((a, j)=>(
			a.map((b, k)=>{
				let roll = Math.random();
				if (roll < 0.4){
					grid[j][k].terrain = 'forest';
					forests++;
				} else if (roll > 0.87) {
					grid[j][k].terrain = 'hills';
					hills++;
				} else {
					field++;
				}
			})))
		return grid;
	},
})