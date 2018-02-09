define(function(){

	return function EventResults(results, turns){
		const eventResultContainer = document.getElementById('event-results-container');
		const eventResultBox = document.getElementById('event-results-box');
		const day = document.createElement('div');
		day.className = 'day-box';
		day.id = `day-${turns}`;
		eventResultBox.appendChild(day);
		results.forEach(a=>{
			const display = document.createElement('div');
			display.className = 'event-result';
			eventResultBox.appendChild(display);

			switch(a.type){
				case 'expedition':
					const title = document.createElement('h3');
					title.innerText = a.defeat ? "Defeat!" : "Victory!";
					const contents = document.createElement('p');
					contents.innerText = `${a.deaths} militia were lost in the battle`;
					display.appendChild(title);
					display.appendChild(contents);
					break;
				case 'message':
					const msgTitle = document.createElement('h3');
					msgTitle.innerText = a.title;
					const body = document.createElement('div');
					for (let msg of a.contents){
						let msgContents = document.createElement('p');
						msgContents.innerText = msg;
						body.appendChild(msgContents);
					}
					display.appendChild(msgTitle);
					display.appendChild(body);
					break;
				default:
					console.log("something unexpected", a)

			}
			day.appendChild(display)
		})
		if (turns > 1){
			document.getElementById('back').removeAttribute('disabled');
		}
		eventResultBox.changeDisplayChild(1);
		eventResultContainer.style.display = 'block';
	}


})