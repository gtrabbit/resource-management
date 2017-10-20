define(['core/Civic'], function(Civic){

	return class Home {
		constructor(topLeft, botRight, startingResources){
			this.territory = [];
			this.resources = startingResources;
		}

		addResource(type, amount){
			this.resources[type] += amount;
		}

		getResources(type){
			return this.resources[type];
		}


	}
})

