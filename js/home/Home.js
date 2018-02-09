define(['tiles/Civic', 'ui/homedisplay', 'events/message', 'utils/compareObjects', 'utils/cloneObject'], 
	function(Civic, homeDisplay, Message, compareObjects, cloneObject){

	return class Home {
		constructor(grid, topLeft, botRight, startingResources, startingPopulation){
			this.territory = [];
			this.resources = startingResources;
			this.grid = grid;
			this.game = grid.game
			this.baseDefense = 10;
			this.population = startingPopulation;
			this.militiaAvailable = startingPopulation.militia;
			this.popGrowth = 0;
			this.caps = {
				'farmers': 10,
				'artisans': 5,
				'woodsmen': 8,
				'militia': 5,
				'militiaAvailable': Infinity,
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
			this.game.stage.addChild(this.display.container);
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

		getAllResources(){
			return cloneObject(this.resources);
		}

		getAllPopulation(){
			return cloneObject(this.population);
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

		modifyPopulace(type, amount){
			if (this.caps[type] > this.population[type]
				&& this.caps.total > this.getTotalPopulation() - this.population.militia){ 

				this.population[type] += amount;
				this.updateDisplay();
			} else {
				return false;
			}	
		}

		update(){
			let popDef = 0;
			let previousResources = this.getAllResources();
			let previousPopulation = this.getAllPopulation();

			for (let key in this.population){
				if (key !== 'militiaAvailable'){
					for (let x = 0; x < this.population[key]; x++) {
						if (this.checkCost(this.costs[key])) {
							this.addResource(this.costs[key])
							this.popGrowth += this.costs[key].popGrowth;
							if (this.popGrowth > 1) {
								this.popGrowth--;
								this.modifyPopulace('commoners', 1);
							}
							popDef += key === 'militia' ? 4 : 0;
							popDef += key === 'woodsmen' ? 1 : 0;
						} else {
							this.disband(key)
						}
					}
				} else {
					this.population.militiaAvailable = this.population.militia;
				}	
			}

			this.summarizeGrowth([previousResources, previousPopulation], [this.resources, this.population]);
			this.determineLosses(popDef + this.baseDefense);
		}



		summarizeGrowth(oldValues, newValues){
			const resChanges = compareObjects(oldValues[0], newValues[0]);
			const popChanges = compareObjects(oldValues[1], newValues[1]);
			const resSummaries = [];
			const popSummaries = [];

			for (let key in resChanges){
				if (resChanges[key] !== 0){
					let verb = resChanges[key] > 0 ? 'gained' : 'lost';
					resSummaries.push(`You have ${verb} ${Math.abs(resChanges[key])} ${key}.`);
				}
			}

			if (resSummaries.length < 1){
				resSummaries.push('Nothing new to report')
			}
			this.game.events.push(new Message('Treasurer\'s Log:', resSummaries));

			for (let key in popChanges){
				if (popChanges[key] !== 0){

					let verb = popChanges[key] > 0 ? 'gained' : 'lost';
					let explanation = popChanges[key] > 0 ? '' : 'due to the shortage of resources'
					popSummaries.push(`The city has ${verb} ${Math.abs(popChanges[key])} ${key} ${explanation}`)
				}
			}

			if (popSummaries.length < 1){
				popSummaries.push('Nothing new to report');
			}
			this.game.events.push(new Message('Office of the Census:', popSummaries));
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

