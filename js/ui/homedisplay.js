define(['utils/compareObjects', 'events/message'], function(compareObjects, Message){
	return function(){

		const style = new PIXI.TextStyle({
			stroke: 'white',
			align: 'center',
			fill: 'white',
			fontSize: '9pt',
			padding: 3,
		})

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
		
		let size = container.getBounds();
		
		backing.beginFill(0x000000);
		backing.drawRect(0,0, 600, size.height+10);
		backing.endFill();


		function summarizeGrowth(oldValues, newValues){
			const resChanges = compareObjects(oldValues[0], newValues[0]);
			const popChanges = compareObjects(oldValues[1], newValues[1]);
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
			container,
			militia,
			militiaAvailable,
			farmers,
			artisans,
			woodsmen,
			commoners,
			silver,
			wood,
			food,
			summarizeGrowth
		}
		
		
	}


})