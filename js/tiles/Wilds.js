define(['tiles/Square', 'events/expedition', 'ui/events/makeexpeditionuiwindow'], function(Square, Expedition, MakeExpeditionUIWindow){
	return class Wilds extends Square{
			constructor(x, y, grid, terrain, growthRate){
				super(x, y, grid, terrain);
				this.dangerValue = 1;
				this.growthRate = growthRate;
				this.type = "wilds";
				this.expedition = {};
				this.iw = this.grid.game.infoWindow;
				this.map = this.grid.game.map;
			}

			getDanger(){
				return this.dangerValue;
			}

			setDanger(value){
				this.dangerValue = value;
			}

			takeTurn(turnNumber){
				const someKindaDifficultyConstant = 10;
				if (!this.expedition.confirmed){
					this.expedition = {};
				}
				let chance = 1;
				let value = 1;
				this.getNeighbors().forEach((a) => {
					let square = this.grid.getTile(a[0], a[1]);
					chance += square.getDanger();	
					})
				if (this.terrain === 'hills') chance * 6;
				if (this.terrain === 'forest') chance * 4;
				if (chance > (Math.random() * (this.growthRate * 5)) + (someKindaDifficultyConstant - (turnNumber / 10))){
					this.setDanger(this.getDanger() + value);
				} 
				this.render();
			}

			setListener(){
				
				if (!this.isExplored) {
					//	this.ui.on('pointerup', ()=>{console.log(this)});
					// this.ui.interactive = true;
				} else {
					this.ui.interactive = true;
					this.ui.on('pointerup', this.showOptions.bind(this));
				}

				

				// const width = this.squareSize;
				// const height = this.squareSize * (1 / 1.618); //practical use of the golden mean

				// this.ui.children[0].on('mouseover', ()=> {
				// 	this.ui.beginFill(0x72613d);
				// 	this.ui.lineStyle(2, 0xAAAAFF, 3);
				// 	this.ui.drawPolygon(0, height / 2, width / 2, 0, width, height / 2, width / 2, height);
				// 	this.ui.endFill();
				// });
				// this.ui.children[0].on('mouseout', () => {
				// 	this.ui.beginFill(0x72613d);
				// 	this.ui.lineStyle(1, 0x000000, 1);
				// 	this.ui.drawPolygon(0, height / 2, width / 2, 0, width, height / 2, width / 2, height);
				// 	this.ui.endFill();
					
				// });

			}
		
			showOptions(){
				if (!this.expedition.hasOwnProperty('confirmed') && !this.expedition.confirmed){
					this.expedition = new Expedition(this)
				}
				//this logic also needs to be moved elsewhere
				const iw = this.grid.game.infoWindow;
				this.grid.game.map.removeChild(iw);
				const exuiw = MakeExpeditionUIWindow(iw, this.expedition, this.grid.game.basicFontStyle, this, this.map);
				iw.position.set(this.ui.parent.x+this.squareSize+10, this.ui.parent.y);
				this.grid.game.makeTextBox(iw, exuiw);
				this.grid.game.map.addChild(iw);	
				this.highlight();

				// new logic... in progress
				//this.grid.game.infoWindow.open(this)

			}

			highlight(){
				const oldTint = this.ui.tint;
				this.ui.tint = 0xFF99BB;
			}

			convertMe(){
				this.grid.convertTile('civic', this.x, this.y, this.terrain);
			}

			markAsExplored(){
				this.isExplored = true;
				this.render();
			}

			markAsSelected(){ //this logic should be passed to the actual ui object, and not handled here
				this.ui.tint = this.isExplored ? 0xDDDDDD : 0x777777;
			}

			render(){ //this logic should be passed to the actual ui object, and not handled here
				this.ui.tint = this.isExplored ? 0xDDDDDD : 0x777777;

				if (this.isExplored) {
					this.ui.interactive = true;
					this.ui.buttonMode = true;
				}
				this.setListener();
		
				//this.ui.children[0][0].alpha = this.getDanger()/20;
			}
		}
})