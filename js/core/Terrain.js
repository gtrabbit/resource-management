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
					} else if (environs.forest > 5){
						b.terrain = 'forest';
					} else if (x > 2 && environs.field > 4 || x > 4){
						b.terrain = 'field'
					}
				})
			})
		}


		
	},

	checkMap(grid){
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


	},

	tryRandom(grid, size){

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