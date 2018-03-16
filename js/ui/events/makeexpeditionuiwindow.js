//this is really ugly...

define([], function(){
	return function MakeExpeditionUIWindow(expedition, tile) {
		
		return {
			expedition: expedition,
			tile: tile,

			onDismiss: function(){
				if (!this.expedition.confirmed){
					this.tile.expedition = {};
				}
			},

			recieveStyle: (style, closingFunction)=>{
				const messageContainer = new PIXI.Container();			
				const dvMsg = new PIXI.Text("Danger Rating: " + expedition.dangerValue, style);
				messageContainer.addChild(dvMsg);
		
				const militiaCommited = new PIXI.Text("Militia Commited: " + expedition.militia, style);
				const militiaAvailableMsg = new PIXI.Text('Militia Available: ' + expedition.militiaAvailable, style);
		
				if (expedition.confirmed){
					const canceler = new PIXI.Text('Cancel Expedition?', style)
					canceler.interactive = true;
					canceler.buttonMode = true;
					messageContainer.addChild(militiaCommited, canceler);
					dvMsg.position.set(150, 20);
					militiaCommited.position.set(0, 20)
					canceler.position.set(10, 40);
					canceler.on('click', ()=>{
						expedition.cancelExpedition();
						closingFunction();
					})
		
				} else {
					const winPropMsg = new PIXI.Text("you must send at least one militia...", style);
					const durationMsg = new PIXI.Text('', style);
					const question = 'How many militia will you commit to this expedition?';
					const increase = new PIXI.Text('more', style);
					const decrease = new PIXI.Text('less', style);
					const adBox = new PIXI.Container();
					adBox.addChild(increase, decrease);
					increase.interactive = true;
					decrease.interactive = true;
					increase.buttonMode = true;
					decrease.buttonMode = true;
					
					const adjustMilitiaDisplay = function(amount){
						militiaCommited.text = "Militia Commited: " + (expedition.militia + amount);
						militiaAvailableMsg.text = 'Militia Available: ' + (expedition.militiaAvailable - amount);
					}
		
					const updateWinChance = function(winChance){
						winPropMsg.text = winChance === null ? "You must send at least one militia" : "Hope of Victory: " + (winChance * 100) + "%";			
					}
		
					increase.on('click', ()=>{
						if (expedition.militiaAvailable > 0){
							adjustMilitiaDisplay(1);
							updateWinChance(expedition.adjustMilitia(1));					
						}
						
					});
					decrease.on('click', ()=>{
						if (expedition.militia > 0){
							adjustMilitiaDisplay(-1);
							updateWinChance(expedition.adjustMilitia(-1));
						}
					});
		
					increase.x = 40;
					decrease.x = 0;
					
					const questionMsg = new PIXI.Text(question, style);					
		
					const confirmation = new PIXI.Text('Confirm Expedition', style)
					confirmation.interactive = true;
					confirmation.buttonMode = true;
					confirmation.on('click', ()=>{
						expedition.confirmExpedition();
					})
		
					messageContainer.addChild(
						questionMsg, militiaCommited, militiaAvailableMsg,
						adBox, winPropMsg, durationMsg, confirmation)
		
					questionMsg.position.set(0, 20);
					militiaAvailableMsg.position.set(0, 80);
					militiaCommited.position.set(0, 60);
					adBox.position.set(0, 100);
					winPropMsg.position.set(20, 120);
					durationMsg.position.set(20, 140);
					confirmation.position.set(20, 170);
					}

					return messageContainer
			
			}



		}
		
		
		
		
		function recieveStyle(style){
			
		}

		}
	
})

