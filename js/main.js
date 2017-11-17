requirejs.config({
	baseUrl: 'js'
})

requirejs(['core/Game', 'core/Grid', 'libs/pixi.min'],

	function(Game, Grid){
		const app = new PIXI.Application(
			600,
			600,
			{backgroundColor: 0x111111})
		const renderer = app.renderer;
		app.view.className = "application"
		document.body.appendChild(app.view);
		const stage = app.stage;

		document.getElementById('grow').addEventListener('click', function(){
			thisGame.update();
		})
		document.getElementById('log').addEventListener('click', function(){
			console.log(thisGame)
		})

		const thisGame = new Game(5, 35, 35, stage, renderer)

		thisGame.setStage();
		thisGame.update();
	}

);