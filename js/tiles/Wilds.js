define(['tiles/Square', 'events/expedition', 'ui/events/makeexpeditionuiwindow'], function(Square, Expedition, MakeExpeditionUIWindow){
	return class Wilds extends Square{
			constructor(x, y, grid, terrain, growthRate){
				super(x, y, grid, terrain);
				this.dangerValue = 1;
				this.growthRate = growthRate;
				this.type = "wilds";
				this.expedition = {};
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
					//	something?
				} else {
					this.ui.interactive = true;
					this.ui.on('click', this.showOptions.bind(this));
				}
			}
		
			showOptions(){
				if (!this.expedition.hasOwnProperty('confirmed') && !this.expedition.confirmed){
					this.expedition = new Expedition(this)
				}
				if (this.grid.game.infoWindow.isOpen && this.grid.game.infoWindow.activeTile.UID === this.UID) {
					this.grid.game.infoWindow.close();
				} else {
					this.grid.game.infoWindow.openWith(MakeExpeditionUIWindow(this.expedition, this), this);
				}
			}

			convertMe(){
				this.grid.convertTile('civic', this.x, this.y, this.terrain);
			}

			markAsExplored(){
				if (this.isExplored) {
					return;
				}
				this.isExplored = true;
				this.setListener();
				this.render();
			}

			render(){ 	//this logic should be passed to the actual ui object
						//(or somewhere else?), and not handled here
				if (this.isExplored) {
					this.ui.tint = 0xDDDDDD;
					this.ui.interactive = true;
					this.ui.buttonMode = true;
				} else {
					this.ui.tint = 0x777777;
				}	
			}
		}
})