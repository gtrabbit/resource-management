define(function(){

	const comeIntoView = ()=>{
		this.style.zIndex = 20;
	}

	const moveOutOfView = ()=>{
		this.style.zIndex = 1;
	}

	return function EventResults(results, turns){
		const eventResultContainer = document.getElementById('event-results-container');
		const eventResultBox = document.getElementById('event-results-box');

		document.getElementById('day-counter').innerText = `Day ${turns}`
		results.forEach(a=>{
			const display = document.createElement('div');
			display.className = 'event-result';
			eventResultBox.appendChild(display)
			display.comeIntoView = comeIntoView;
			display.moveOutOfView = moveOutOfView;
			switch(a.type){
				case 'expedition':
					const title = document.createElement('h3');
					title.innerText = a.defeat ? "Defeat!" : "Victory!";
					const contents = document.createElement('p');
					contents.innerText = `${a.deaths} militia were lost in the battle`;
					display.appendChild(title);
					display.appendChild(contents);
					break;
				default:
					console.log("something unexpected", a)

			}
		})
		eventResultContainer.style.display = 'flex';
	}


})