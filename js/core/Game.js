define(['core/Grid', 'ui/eventresults', 'events/message', 'ui/map/Map', 'ui/infowindow', 'ui/maketextbox',
		'ui/setupeventsbox'], function(Grid, EventResults, Message, Map, InfoWindow, makeTextBox, SetupEventsBox){
	

	return class Game{
		constructor(growthRate, width, height, stage, renderer, animationHook){
			this.growthRate = growthRate;
			this.width = width;
			this.height = height;
			this.stage = stage;
			this.squareSize = 32;
			this.map = Map(width, height, this.squareSize);
			this.renderer = renderer;
			this.turns = 0;
			this.grid = new Grid(this);
			this.events = [];
			this.eventArchive = {};
			this.basicFontStyle = {
				fontFamily: 'Georgia',
				fontSize: '10pt',
				wordWrap: true,
				wordWrapWidth: 230,
				padding: 10
			}  //just for now. something better later for sure
			this.infoWindow = InfoWindow();
			this.welcomeMessage = new Message('Welcome!', ['Hello, and welcome to the game!']);
			this.eventsDisplay = SetupEventsBox(this.events, this.welcomeMessage);
			this.makeTextBox = makeTextBox;
			this.animationHook = animationHook;
		}


		showEventResults(results){
			this.eventArchive[this.turns] = this.events.splice(0, this.events.length).map(a=>a.resolve());
			EventResults(this.eventArchive[this.turns], this.turns);
		}

		update(){
			this.map.removeChild(this.infoWindow);
			this.turns++;
			this.showEventResults();
			this.grid.home.update();
			this.grid.update();
		}

		setStage(){
			this.grid.rows.forEach((a,j)=>{
				a.forEach((b,k)=>{
					b.makeUI();
					this.map.addChild(b.ui);
				})
			})
			this.stage.addChildAt(this.map, 0);
		}
	}

})


	
// eventArchive = {
// 	day: [
// 		events, events, events
// 	],
// 	day: [
// 		events, events, events
// 	]
// }