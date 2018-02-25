define(['core/Grid', 'ui/events/eventresults', 'events/message', 'ui/map/Map', 'ui/infowindow', 'ui/maketextbox',
		'ui/events/setupeventsbox'], function(Grid, EventResults, Message, MapUI, InfoWindow, makeTextBox, SetupEventsBox){
	

	return class Game{
		constructor(state, screenWidth, screenHeight, stage, renderer, animationHook){

			//=========PIXI essentials===========//
			this.stage = stage;
			this.renderer = renderer;
			this.animationHook = animationHook;
			this.screenWidth = screenWidth;
			this.screenHeight = screenHeight;

			//===========Constants============//

			this.basicFontStyle = {
				fontFamily: 'Georgia',
				fontSize: '10pt',
				wordWrap: true,
				wordWrapWidth: 230,
				padding: 10
			}  //just for now. something better later for sure
			this.welcomeMessage = new Message('Welcome!', ['Hello, and welcome to the game!']);
			this.squareSize = 32;

			this.map = MapUI(state.width, state.height, this.squareSize, screenWidth, screenHeight);  //== doesn't belong here, but has to happen before the grid...

			this.state = {
				growthRate: state.growthRate,
				width: state.width,
				height: state.height,
				turns: state.turns || 0,
				events: state.events || [],
				eventArchive: state.eventArchive || {},
				upcomingEvents: state.upcomingEvents || []
			}

// we extractState() from grid, so this is not techincally part of state, since grid has logic and the state should only be data
			this.grid = !state.grid ? new Grid(this) : new Grid(this, state.grid);
			
			//============Logic/Function============///
			this.eventsDisplay = SetupEventsBox(this.state.events, this.welcomeMessage);
			this.makeTextBox = makeTextBox;
			this.infoWindow = InfoWindow();
		}

		//methods...

		extractState(){
			return {
				gameState: this.state,
				gridState: this.grid.extractState()
			}
		}

		showEventResults(){
			const completedEvents = [];
			for (let i = 0; i < this.state.events.length; i++) {
				let event = this.state.events[i];
				if (event.timer.modifyDuration() < 0){
					completedEvents.push(this.state.events.splice(i, 1)[0].resolve());
					i--;
				}
			}
			console.log(completedEvents);
			this.state.eventArchive[this.state.turns] = completedEvents;
			EventResults(this.state.eventArchive[this.state.turns], this.state.turns);
		}

		addEvent(event){
			this.state.events.push(event);
		}

		removeEvent(eventId){
			this.state.events.splice(
				this.state.events.findIndex(a => a.eventId === eventId), 1);
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

		update(){
			this.map.removeChild(this.infoWindow);
			this.state.turns++;
			this.showEventResults();
			this.grid.home.update(this.state.turns);
			this.grid.update(this.state.turns);
		}
	}
})


	
// eventArchive = {
//	record: {eventID: timesTriggered, eventID: timesTriggered, eventID: timesTriggered...},
// 	day: [
// 		events, events, events
// 	],
// 	day: [
// 		events, events, events
// 	]
// }