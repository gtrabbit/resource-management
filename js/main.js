requirejs.config({
	baseUrl: 'js'

})

requirejs(['core/Game', 'core/Grid', 'libs/pixi.min'],

	function(Game, Grid){
		const app = new PIXI.Application(
			window.innerWidth-20,
			window.innerHeight-20,
			{backgroundColor: 0x111111})
		const renderer = app.renderer
		document.body.appendChild(app.view);
		const stage = app.stage;


		document.getElementById('grow').addEventListener('click', function(){
			thisGame.update();
			//renderer.render(stage)
		})
		document.getElementById('log').addEventListener('click', function(){
			console.log(thisGame)
		})




		let thisGame = new Game(5, 35, 35, stage, renderer)

		
		thisGame.setStage();
		thisGame.update();


	}

);