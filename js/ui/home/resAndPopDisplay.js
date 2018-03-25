define(['events/message'], function(Message){
	return function(){

	
		function constructor(){
			const style = new PIXI.TextStyle({
				stroke: 'white',
				align: 'center',
				fill: 'white',
				fontSize: '9pt',
				padding: 3,
			})
			
//TODO: Fill out display objects for maximum values	
			const container = new PIXI.Container();
			const militia = new PIXI.Text('Militia\n 0 /      ', style);
			const militiaAvailable = new PIXI.Text('(0)', style);
			const farmers = new PIXI.Text('Farmers\n 0', style);
			const artisans = new PIXI.Text('Artisans\n 0', style);
			const woodsmen = new PIXI.Text('Woodsmen\n 0', style);
			const commoners = new PIXI.Text('Commoners\n 0', style);
			const silver = new PIXI.Text('Silver\n 0', style);
			const wood = new PIXI.Text('Wood\n 0', style);
			const food = new PIXI.Text('Food\n 0', style);
			let list = [commoners, militia, woodsmen, farmers,
				artisans, silver, wood, food];
	
			list.forEach((a, i)=>{
				if (i===1){
					i = 1.2;
				}
				a.position.set(15 + (i*70), 5)
			})
	
			militiaAvailable.position.set(117, 18);
			const backing = new PIXI.Graphics();
	
			container.addChild(backing, militia, militiaAvailable, farmers, artisans,
				woodsmen, commoners, silver, wood, food);
			
			let size = container.getBounds(); //probably not necessary-- can just get static dimensions (eventually)
			
			backing.beginFill(0x000000);
			backing.drawRect(0,0, 600, size.height+10);
			backing.endFill();
			return {
				container,
				militia,
				militiaAvailable,
				farmers,
				artisans,
				woodsmen,
				commoners,
				silver,
				wood,
				food
			}
		}
		
		const display = constructor();
		
		
		function update(typeAmount){
			Object.keys(typeAmount).forEach(a=>{
				if (display.hasOwnProperty(a)) {
					display[a].text = display[a].text.replace(/\d+/, typeAmount[a])
				}
			})
		}

		function summarizeGrowth(resChanges, popChanges){
			const resSummaries = [];
			const popSummaries = [];
			for (let key in resChanges){
				if (key !== 'popGrowth' && resChanges[key] !== 0){
					let verb = resChanges[key] > 0 ? 'gained' : 'lost';
					resSummaries.push(`You have ${verb} ${Math.abs(resChanges[key])} ${key}.`);
				}
			}
			if (resSummaries.length < 1){
				resSummaries.push('Nothing new to report')
			}
			for (let key in popChanges){
				if (popChanges[key] !== 0){
					let verb = popChanges[key] > 0 ? 'gained' : 'lost';
					let explanation = popChanges[key] > 0 ? '' : 'due to the shortage of resources'
					popSummaries.push(`The city has ${verb} ${Math.abs(popChanges[key])} ${key} ${explanation}`)
				}
			}
			if (popSummaries.length < 1){
				popSummaries.push('Nothing new to report');
			}
			return [new Message('Treasurer\'s Log:', resSummaries),
				new Message('Office of the Census:', popSummaries)]
		}

		return {
			summarizeGrowth,
			update,
			container: display.container
		}	
	}
})