define(['tiles/Square', 'tiles/Civic', 'events/expedition', 'ui/makeexpeditionuiwindow'], function(Square, Civic, Expedition, MakeExpeditionUIWindow){
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

			takeTurn(){
				this.render();
			}

			setListener(){
				this.ui.on('pointerup', this.showOptions.bind(this));
			}

			calcWinPercentage(militia){
				let baseDV = this.getDanger();
				let DVrange = [baseDV*4, (baseDV*6)-1];
				let lossThresh = ~~(militia/2) + 1;
				let c = (militia*3) + (lossThresh * 2);
				let perc = DVrange[1] - c;
				let range = (DVrange[1] - DVrange[0])+1;
				let chances = Math.max(c - DVrange[0], -1) + 1;
				if (!chances){
					return 0;
				} else {
					return Math.min((chances / range).toFixed(2), 1);
				}
			}


			adjustMilitia(value, messageContainer, mAvail, mCom, winProbMsg){
					this.expedition.militia += value;
					this.expedition.militiaAvailable -= value;
					messageContainer.children[messageContainer.getChildIndex(mCom)]
						.text = "Militia Commited: " + this.expedition.militia;
					messageContainer.children[messageContainer.getChildIndex(mAvail)]
						.text = 'Militia Available: ' + this.expedition.militiaAvailable;
					
					if (this.expedition.militia){
						let winChance = this.calcWinPercentage(this.expedition.militia);
						messageContainer.children[messageContainer.getChildIndex(winProbMsg)]
							.text = "Hope of Victory: " + (winChance * 100) + "%";
					} else {
						messageContainer.children[messageContainer.getChildIndex(winProbMsg)]
							.text = "You must send at least one militia"
					}					
			}

			confirmExpedition(){
				if (this.expedition.isValid()){
					this.grid.home.population.militia -= this.expedition.militia;
					this.grid.game.events.push(this.expedition);
					this.expedition.confirmed = true;
					this.showOptions();
				} else {
					console.log('that will never work...')
				}

			}

			cancelExpedition(){
				this.grid.home.population.militia += this.expedition.militia;
				this.grid.game.events.splice(
					this.grid.game.events.findIndex(a=>a.eventId === this.expedition.eventId), 1);
				this.expedition.confirmed = false;
				this.closeIw();
			}


			closeIw(){
				this.grid.game.map.removeChild(this.iw);
			}
			
			showOptions(){
				if (!this.expedition.hasOwnProperty('confirmed') && !this.expedition.confirmed){
					this.expedition = new Expedition(this)
				}
				const iw = this.grid.game.infoWindow;
				this.grid.game.map.removeChild(iw);
				const exuiw = MakeExpeditionUIWindow(iw, this.expedition, this.grid.game.basicFontStyle, this);
				iw.position.set(this.ui.x+this.squareSize+10, this.ui.y);
				this.grid.game.makeTextBox(exuiw);
				this.grid.game.map.addChild(iw);	
				
			}
//this should probably not require knowledge of an outside class?

			convertMe(){
				let starter = new Civic(
					this.x,
				 	this.y,
				 	this.grid,
				 	this.terrain);
				this.grid.convertTile(this.x, this.y, starter);
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