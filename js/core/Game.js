define(function(){
	

	return class Game{
		constructor(growthRate, width, height, stage, renderer){
			this.growthRate = growthRate;
			this.width = width;
			this.height = height;
			this.stage = stage;
			this.renderer = renderer;
			this.turns = 0;
			
		}



		update(){
			this.turns++;
			this.grid.home.update();
			this.grid.update();
			this.render();
			console.log(this.turns)

		}

		setStage(){
			this.grid.rows.forEach((a,j)=>{
				a.forEach((b,k)=>{
					b.makeUI();
					this.stage.addChild(b.ui);
				})
			})
		}

		render(){
			this.renderer.render(this.stage);
		}
		
	}

})


	
