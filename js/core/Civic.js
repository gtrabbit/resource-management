define(['core/Square'], function(Square){
	return class Civic extends Square {
		constructor(x, y, maxWidth, maxHeight){
			super(x, y, maxWidth, maxHeight);
			this.usage = 'field';
			this.type = 'civic';
		}

		build(structure){
			this.usage = structure;
		}
	}

	
})


