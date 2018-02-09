define([], function(){
	return function MakeExpeditionUIWindow(iw, expedition, style, tile) {
		const messageContainer = new PIXI.Container();
		const closer = new PIXI.Text('X', style);
		closer.interactive = true;
		closer.buttonMode = true;
		closer.on('click', ()=>{
			closeIw();
		})



		function closeIw(){
			iw.parent.removeChild(iw);
		}

		closer.position.set(240, 0);
		messageContainer.addChild(closer)
			
		const dvMsg = new PIXI.Text("Danger Rating: " + expedition.dangerValue, style);
		messageContainer.addChild(dvMsg);

		const militiaCommited = new PIXI.Text("Militia Commited: " + expedition.militia, style);
		const milMsg = new PIXI.Text('Militia Available: ' + expedition.militiaAvailable, style);

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
				closeIw();
			})

		} else {
			const winPropMsg = new PIXI.Text("you must send at least one militia...", style);
			const q = 'How many militia will you commit to this expedition?';
			const increase = new PIXI.Text('more', style);
			const decrease = new PIXI.Text('less', style);
			const adBox = new PIXI.Container();
			adBox.addChild(increase, decrease);
			increase.interactive = true;
			decrease.interactive = true;
			increase.buttonMode = true;
			decrease.buttonMode = true;
			increase.on('click', ()=>{
	
				if (expedition.militiaAvailable > 0){
					expedition.adjustMilitia(1, messageContainer, milMsg, militiaCommited, winPropMsg)
				}
				
			});
			decrease.on('click', ()=>{
				if (expedition.militia > 0){
					expedition.adjustMilitia(-1, messageContainer, milMsg, militiaCommited, winPropMsg)
				}
			});

			increase.x = 40;
			decrease.x = 0;
			
			const qMsg = new PIXI.Text(q, style);					

			const confirmation = new PIXI.Text('Confirm Expedition', style)
			confirmation.interactive = true;
			confirmation.buttonMode = true;
			confirmation.on('click', ()=>{
				expedition.confirmExpedition();
			})

			messageContainer.addChild(
				qMsg, militiaCommited, milMsg,
				adBox, winPropMsg, confirmation)

			qMsg.position.set(0, 20);
			milMsg.position.set(0, 80);
			militiaCommited.position.set(0, 60);
			adBox.position.set(0, 100)
			winPropMsg.position.set(20, 120)
			confirmation.position.set(20, 160)
			}

			return messageContainer;
		}
	
})

