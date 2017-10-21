define(['core/Square'], function(Square){
	return class Civic extends Square {
		constructor(x, y, maxWidth, maxHeight, terrain){
			super(x, y, maxWidth, maxHeight, terrain);
			this.usage = 'field';
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
		}

		build(structure){
			this.usage = structure;
		}
	}

	
})


