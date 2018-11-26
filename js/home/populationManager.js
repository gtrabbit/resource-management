define(['home/citizens/artisan', 'home/citizens/commoner', 'home/citizens/farmer', 'home/citizens/militia',
	'home/citizens/woodsman', 'utils/cloneObject', 'utils/sumObjects'], 
function(Artisan, Commoner, Farmer, Militia, Woodsman, cloneObject, sumObjects){
    return class PopulationManager {
        constructor(home, startingPopulation){
            this.home = home;
            this.citizens = {
				artisans: new Artisan(),
				commoners: new Commoner(),
				farmers: new Farmer(),
				militia: new Militia(),
				woodsmen: new Woodsman()
			};
			this.population = startingPopulation;
			this.population.militiaAvailable = startingPopulation.militia;			
			this.populationCaps = {
				militaryCapacity: 0,
				citizenCapacity: 0
			};

		}

		getCitizenTypes(type) {
			return type ? this.citizens[type] : this.citizens;
		}

		getCitizenTypeCost(type) {
			//fuck
		}
		
		getCapType(citizenType) {
			return citizenType === this.citizens.militia.type ? "militaryCapacity" : "citizenCapacity";
		}

		//returns number of citizens post-disband of supplied type
		disband(citizenTypeName){ //a disbanded commoner is essentially dead
			if (this.population[citizenTypeName] > 0) {
				if (citizenTypeName !== this.citizens.commoners.type) this.population.commoners++;
				return --this.population[citizenTypeName];
			}		
			return 0;
		}

		setPopulationCaps(newCaps){
			this.populationCaps = newCaps;
			return this.getPopulationCaps();
		}

		modifyPopulationCaps(typeAmount) {
			for (let type in typeAmount) {
				if (typeAmount.hasOwnProperty(type)) {
					this.populationCaps[type] += typeAmount[type];
				}
			}
			return this.getPopulationCaps();
		}

		getAllPopulation(){
			return cloneObject(this.population);
		}

		getPopulationCaps() { 
			return cloneObject(this.populationCaps);
		}

		getMilitiaCap() {
			return this.populationCaps.militaryCapacity;
		}

		convertCitizen(fromType, targetType, givenAmount){
			const amount = givenAmount || 1;
			const capType = this.getCapType(targetType);
			if (this.canConvertCitizen(capType, amount)){
				this.modifyPopulace(fromType, -amount);
				return true;				
			} else {
				return false;
			}			
		}

		canConvertCitizen(capType, amount){
			return this.population[this.citizens.commoners.type] >= amount && (capType === "citizenCapacity" 
				? this.populationCaps[capType] >= (this.getNonMilitaryPopulation() + amount) 
				: this.populationCaps[capType] >= (this.population.militia + amount));
		}

		getTotalPopulation(){
			return Object.keys(this.population)
				.reduce((a, b)=>(a+this.population[b]), 0)
		}

		getNonMilitaryPopulation() {
			return Object.keys(this.population)
				.reduce((a, b)=> (a + (!b.startsWith(this.citizens.militia.type) ? this.population[b] : 0)), 0)
		}

		modifyPopulace(type, amount){ 
			if (this.canConvertCitizen){
				this.population[type] += amount;
				if (type === this.citizens.militia.type) {
					this.population.militiaAvailable += amount;
				}
				return true;
			}
			return false;			
		}

        update(turnNumber) {

        }
    }
})