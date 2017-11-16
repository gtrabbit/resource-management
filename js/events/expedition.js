define([], function(){
	return class Expedition {
		constructor(mAvail, id, danger){
			this.type = 'expedition';
			this.militia = 0;
			this.militiaAvailable = mAvail || 0;
			this.eventId = "ex-" + id || '99999';
			this.dangerValue = danger || 0;
			this.confirmed = false;
		}

		isValid(){
			return this.militia > 0;
		}

		determineResults(){
			let enemy = ((this.dangerValue*2) + ~~(Math.random() * this.dangerValue) ) * 2;
			let deaths = ~~(Math.max(enemy - this.militia*3, 0)/2)
			return {
				defeat: deaths > (this.militia / 2),
				deaths: Math.min(deaths, this.militia)
			}
		}

		calcWinPercentage(){
			let baseDV = this.dangerValue;
			let DVrange = [baseDV*4, (baseDV*6)-1];
			let lossThresh = ~~(this.militia/2) + 1;
			let c = (this.militia*3) + (lossThresh * 2);
			let perc = DVrange[1] - c;
			let range = (DVrange[1] - DVrange[0])+1;
			let chances = Math.max(c - DVrange[0], -1) + 1;
			if (!chances){
				return 0;
			} else {
				return Math.min((chances / range).toFixed(2), 1);
			}
		}

		resolve(){
			results = this.determineResults();
			
		}

	}
})

