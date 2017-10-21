define(['home/Home'], function(Home){
	

	return class Game{
		constructor(growthRate, width, height, stage){
			this.growthRate = growthRate;
			this.width = width;
			this.height = height;
			this.stage = stage
			
		}


		update(){
			this.grid.update();
	    	this.home.update();
		}

		render(){
			this.stage.removeChildren();
			this.grid.rows.forEach((a,j)=>{
				a.forEach((b,k)=>{
					b.makeUI();
					this.stage.addChild(b.ui);
				})
			})
		}
		
	}

})


	
