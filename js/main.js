requirejs.config({
	baseUrl: 'js'

})

requirejs(['core/Game', 'core/Grid'],

	function(Game, Grid){
		let thisGame = new Game(5, 20, 20)
		thisGame.grid = new Grid(thisGame.height, thisGame.width, thisGame.growthRate, [3, 3]);



	}

);