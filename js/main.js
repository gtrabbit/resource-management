requirejs.config({
	baseUrl: 'js'
})
                     //don't need this?
requirejs(['core/Game', 'core/settings', '../node_modules/pixi.js/dist/pixi.min'],

	function(Game, makeSettings){
		const screenHeight = 800;
		const screenWidth = 900;

		const app = new PIXI.Application(
			screenWidth,
			screenHeight,
			{backgroundColor: 0x111111})
		const renderer = app.renderer;
		app.view.className = "application"
		document.body.appendChild(app.view);
		const stage = app.stage;
		stage.name = 'stage';
		const animationHook = app.ticker;

		//fix this eventually, obviously
		document.getElementById('grow').addEventListener('click', function(){
			thisGame.update();
		})
		document.getElementById('log').addEventListener('click', function(){
			console.log(thisGame)
		})
		
		//have a UI element to decide this, or load from a DB
		const isNewGame = true;
		
		
		let state = {};

		if (isNewGame){
			const settings = makeSettings('medium');
			state = {
				width: 55,
				growthRate: 5,
				height: 55,
				startingResources: settings.startingResources,
				startingPopulation: settings.startingPopulation
			}
			
		} else {
			//xhr to get the game state
			// then state = {something else...}
		}

		const thisGame = new Game(state, screenWidth, screenHeight, stage, renderer, animationHook)

		thisGame.setStage();
		thisGame.update();
	}

);