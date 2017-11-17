define(['core/Civic', 'ui/homedisplay'], function(Civic, homeDisplay){

	return class Home {
		constructor(grid, topLeft, botRight, startingResources, startingPopulation){
			this.territory = [];
			this.resources = startingResources;
			this.grid = grid;
			this.baseDefense = 10;
			this.population = startingPopulation;
			this.popGrowth = 0;
			this.caps = {
				'farmers': 10,
				'artisans': 5,
				'woodsmen': 8,
				'militia': 5,
				'commoners': Infinity,
				'total': 50
			}
			this.costs = {
				farmers: {
					'silver': -1,
					'food': 5,
					'popGrowth': 0.04
				},
				militia: {
					'silver': -2,
					'food': -2,
					'popGrowth': 0
				},
				artisans: {
					'food': -2,
					'silver': 5,
					'popGrowth': 0.05
				},
				commoners: {
					'food': -1,
					'popGrowth': 0.1
				},
				woodsmen: {
					'food': -1,
					'silver': -1,
					'wood': 5,
					'popGrowth': 0.02
				}
			}
			this.display = homeDisplay();
			this.grid.game.stage.addChild(this.display.container);
		}

		addResource(typeAmount){
			Object.keys(typeAmount)
				.filter(a=>(a !== 'popGrowth'))
				.forEach(a=>{
					this.resources[a] += typeAmount[a];
				})
			this.updateDisplay();
		}

		getResources(type){
			return this.resources[type];
		}

		checkCost(cost){
			return cost.length === 0 || Object.keys(cost)
				.filter(a=>(a !== 'popGrowth'))
				.every(a=>(this.resources[a] >= -cost[a]))
		}

		disband(citizen){
			this.population[citizen]--;
			this.population.commoners++;
			this.updateDisplay();
		}

		getTotalPopulation(){
			return Object.keys(this.population)
				.reduce((a, b)=>(a+this.population[b]), 0)
		}

		addCitizen(citizen){
			if (this.caps[citizen] > this.population[citizen]
				&& this.caps.total > this.getTotalPopulation() - this.population.militia){ 

				this.population[citizen] += 1;
				this.updateDisplay();
			} else {
				return false;
			}	
		}

		update(){
			let popDef = 0;
			for (let key in this.population){
				for (let x = 0; x < this.population[key]; x++){
					if (this.checkCost(this.costs[key])){
						this.addResource(this.costs[key])
						this.popGrowth += this.costs[key].popGrowth;
						if (this.popGrowth > 1){
							this.popGrowth --;
							this.addCitizen('commoners');
						}
						popDef += key === 'militia' ? 4 : 0;
						popDef += key === 'woodsmen' ? 1 : 0;
					} else {
						this.disband(key)
					}
				}
			}
			this.determineLosses(popDef + this.baseDefense);
		}

		updateDisplay(){
			const numbers = {...this.population, ...this.resources};
			Object.keys(numbers).forEach(a=>{
				this.display[a].text = this.display[a].text.replace(/\d+/, numbers[a])
			})
		}

		
		determineLosses(def){
			//need to flesh this out
			this.findPerimeterDanger(this.territory)
			
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

