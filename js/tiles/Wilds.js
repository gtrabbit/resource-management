define(['tiles/Square', 'events/expedition', 'ui/makeexpeditionuiwindow'], function(Square, Expedition, MakeExpeditionUIWindow){
	return class Wilds extends Square{
			constructor(x, y, grid, terrain, growthRate){
				super(x, y, grid, terrain);
				this.dangerValue = 1;
				this.growthRate = growthRate;
				this.type = "wilds";
				this.expedition = {};
				this.iw = this.grid.game.infoWindow;
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
				this.ui.on('pointerup', this.showOptions.bind(this));
			}
		
			showOptions(){
				if (!this.expedition.hasOwnProperty('confirmed') && !this.expedition.confirmed){
					this.expedition = new Expedition(this)
				}
				const iw = this.grid.game.infoWindow;
				this.grid.game.map.removeChild(iw);
				const exuiw = MakeExpeditionUIWindow(iw, this.expedition, this.grid.game.basicFontStyle, this);
				iw.position.set(this.ui.x+this.squareSize+10, this.ui.y);
				this.grid.game.makeTextBox(iw, exuiw);
				this.grid.game.map.addChild(iw);	
				
			}

			convertMe(){
				this.grid.convertTile('civic', this.x, this.y, this.terrain);
			}

			render(){
				if (!this.isExplored){
					this.ui.alpha = 0.2
				} else {
					this.ui.alpha = 0.5;
					this.ui.interactive = true;
					this.ui.buttonMode = true;
				}
				this.ui.children[0].alpha = this.getDanger()/20;
			}
		}
})