requirejs.config({
	baseUrl: 'js'

})

requirejs(['core/Game', 'core/Grid', 'libs/pixi.min'],

	function(Game, Grid){
		const renderer = PIXI.autoDetectRenderer(window.innerWidth-20, window.innerHeight-20);
		document.body.appendChild(renderer.view);
		const stage = new PIXI.Container();
		document.getElementById('grow').addEventListener('click', function(){
			thisGame.update();
			//renderer.render(stage)
		})
		document.getElementById('log').addEventListener('click', function(){
			console.log(thisGame)
		})




		let thisGame = new Game(5, 35, 35, stage, renderer)
		thisGame.grid = new Grid(thisGame, [3, 3]);
		
		thisGame.setStage();
		thisGame.update();


	}

);