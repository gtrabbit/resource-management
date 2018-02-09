define(['core/Grid', 'ui/eventresults', 'events/message'], function(Grid, EventResults, Message){
	

	return class Game{
		constructor(growthRate, width, height, stage, renderer){
			this.growthRate = growthRate;
			this.width = width;
			this.height = height;
			this.stage = stage;
			this.squareSize = 32;
			this.map = this.makeMap();
			this.renderer = renderer;
			this.turns = 0;
			this.infoWindow = this.makeInfoWindow();
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
			this.welcomeMessage = new Message('Welcome!', ['Hello, and welcome to the game!']);
			this.eventsDisplay = this.setupEventsBox();

		}

		

		makeMap(){
			let map = new PIXI.Container();
			map.interactive = true;
			map.x = this.width*(this.squareSize/2) + 20;
			map.y = this.height*(this.squareSize/2) + 20;
			map.pivot.set(this.width*(this.squareSize/2) + 20, this.height*(this.squareSize/2) + 20)
			map
				.on('pointerdown', onDragStart)
				.on('pointerup', onDragEnd)
				.on('pointerupoutside', onDragEnd)
				.on('pointermove', onDragMove);

			function onDragStart(event){
				this.data = event.data;
				let position = this.data.getLocalPosition(this);
				this.pivot.set(position.x, position.y)
				this.position.set(this.data.global.x, this.data.global.y)
				this.dragging = true;
			}	

			function onDragEnd(){
				this.dragging=false;
				this.data = null;
			}

			function onDragMove(){
				if (this.dragging){
					let newPosition = this.data.getLocalPosition(this.parent);
					let xBound = newPosition.x - this.pivot.x;
					let yBound = newPosition.y - this.pivot.y;
					if (xBound < 100 && xBound > -600 && yBound < 100 && yBound > -600){
						this.x = newPosition.x;
						this.y = newPosition.y;
					}
				}
			}
			return map;
		}

		makeInfoWindow(){
			let infoWindow = new PIXI.Container();
			let box = new PIXI.Graphics();
			infoWindow.addChild(box);
			return infoWindow;
		}

		makeTextBox(message){
			let textBox = this.infoWindow.children[0];
			textBox.removeChildren();
			textBox.clear();
			textBox.lineStyle(3, 0x397be5, 1);
			let size = message.getBounds();
			textBox.beginFill(0xFFFFFF);
			textBox.drawRoundedRect(0, 0, size.width+10, size.height+20, 15);
			textBox.endFill();
			message.position.set(10, 5)
			textBox.addChild(message);
			return textBox;
		}

		showEventResults(results){
			this.eventArchive[this.turns] = this.events.splice(0, this.events.length).map(a=>a.resolve());
			EventResults(this.eventArchive[this.turns], this.turns);
		}

		setupEventsBox(){
			const box = document.getElementById('event-results-box');
			const container = document.getElementById('event-results-container');
			container.close = ()=>{
				container.style.display = 'none';
			}
			box.currentlyDisplayedChild = -1;
			box.changeDisplayChild = function(dir){
				if (this.currentlyDisplayedChild > -1){
					this.children[this.currentlyDisplayedChild].style.display = 'none';
				}
				
				this.currentlyDisplayedChild += dir;
				this.children[this.currentlyDisplayedChild].style.display = 'block';
				document.getElementById('day-counter').innerText = `Day ${this.currentlyDisplayedChild+1}`
				return this.currentlyDisplayedChild;
			}

			const close = document.getElementById('close');
			close.addEventListener('click', ()=>{
				container.close();
			})

			const next = document.getElementById('next');
			next.setAttribute('disabled', true);
			const back = document.getElementById('back');
			back.setAttribute('disabled', true);
			
			next.addEventListener('click', ()=>{
				box.changeDisplayChild(1);
				back.removeAttribute('disabled');
				if (box.children.length === box.currentlyDisplayedChild+1){
					next.setAttribute('disabled', true);
				}
			})
			
			back.addEventListener('click', ()=>{
				box.changeDisplayChild(-1);
				next.removeAttribute('disabled');
				if (box.currentlyDisplayedChild === 0){
					back.setAttribute('disabled', true);
				}

			})
			this.events.push(this.welcomeMessage);
			return container;
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