define(['events/message', 'ui/home/homedashboard'], function(Message, makeDashboard){
	return function(){

		const display = makeDashboard();
		const cachedValues = {};
		function update(typeAmount){
			Object.keys(typeAmount).forEach(a=>{
				if (typeAmount.hasOwnProperty(a) && a !== 'popGrowth') {
					let amount = typeAmount[a];
					if (cachedValues[a] !== amount) {
						cachedValues[a] = amount;
						display.updateItem(a, amount);
					}
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