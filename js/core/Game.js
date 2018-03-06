define(['core/Grid', 'ui/events/eventresults', 'events/message', 'ui/map/Map', 'ui/infowindow/infowindow', 'ui/infowindow/maketextbox',
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
			this.squareSize = 80; //looks like we're stuck at this number for now 

			

			//=========Display Layers=============//
			this.overlays = new PIXI.Container();
			this.infoWindowLayer = new PIXI.Container();
			this.floatLayer = new PIXI.Container();
			this.tileLayer = new PIXI.Container();
			this.map = MapUI(state.width, state.height, this.squareSize, screenWidth, screenHeight);
			this.floatLayer.name = 'floatLayer';
			this.infoWindowLayer.name = 'infoWindowLayer';
			this.overlays.name = 'overlays';
			this.map.name = 'map';
			this.tileLayer.name = 'tileLayer';


			//============State=================//

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

			//================ Flags ==============//
			this.pleaseSortTiles;

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

			this.stage.addChild(this.map, this.overlays);
			this.map.addChild(this.tileLayer, this.floatLayer, this.infoWindowLayer);

			for (let rowNumber = this.grid.rows.length-1; rowNumber >= 0; rowNumber--){
				for (let colNum = this.grid.rows[rowNumber].length-1; colNum >= 0; colNum--){
					this.grid.rows[rowNumber][colNum].makeUI();
					this.tileLayer.addChildAt(this.grid.rows[rowNumber][colNum].ui.parent, 0);
				}
			}

			this.stageIsSet = true;
		}

		update(){
			this.map.removeChild(this.infoWindow); //this needs to be handled by the infowindow itself
			this.state.turns++;
			this.grid.home.update(this.state.turns);
			this.grid.update(this.state.turns);
			this.showEventResults();
			if (this.pleaseSortTiles) {
				this.map.sortTiles(this.tileLayer);
				this.pleaseSortTiles = false;
			}			
		}
	}
})