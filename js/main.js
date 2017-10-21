requirejs.config({
	baseUrl: 'js'

})

requirejs(['core/Game', 'core/Grid', 'libs/pixi.min'],

	function(Game, Grid){
		const renderer = PIXI.autoDetectRenderer(256, 256);
		document.body.appendChild(renderer.view);
		const stage = new PIXI.Container();




		let thisGame = new Game(5, 25, 25, stage)
		thisGame.grid = new Grid(thisGame.height, thisGame.width, thisGame.growthRate, [3, 3]);
		
		thisGame.render();

		console.log(thisGame)
		renderer.render(stage)
	}

);