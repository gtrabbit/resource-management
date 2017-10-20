define(['home/Home'], function(Home){
	

	return class Game{
		constructor(growthRate, width, height){
			this.growthRate = growthRate;
			this.width = width;
			this.height = height;
			this.squareSize = 7;
			
		}


		update(){
			this.grid.update();
	    	this.home.update();
		}
		
	}

})


	
