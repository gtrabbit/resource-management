define(['ui/events/eventIndicator', 'events/Timer'], function(makeEventIndicator, Timer){
	return class Expedition {
		constructor(tile){
			this.type = 'expedition';
			this.militia = 0;
			this.militiaAvailable = tile.grid.home.population.militiaAvailable || 0;
			this.eventId = "ex-" + tile.UID || '99999';
			this.dangerValue = tile.getDanger() || 0;
			this.confirmed = false;
			this.tile = tile;
			const waitPeriod = Math.ceil(this.dangerValue / 2);
			this.timer = new Timer('event', waitPeriod);
		}

		isValid(){
			return this.militia > 0;
		}

		determineResults(){
			let enemy = ((this.dangerValue*2) + ~~(Math.random() * this.dangerValue) ) * 2;
			let deaths = ~~(Math.max(enemy - this.militia*3, 0)/2);
			return {
				defeat: deaths > (this.militia / 2),
				deaths: Math.min(deaths, this.militia),
				tile: this.tile,
				type: this.type
			}
		}

		calcWinPercentage(militia) {
			let baseDV = this.dangerValue;
			let DVrange = [baseDV * 4, (baseDV * 6) - 1];
			let lossThresh = ~~(militia / 2) + 1;
			let c = (militia * 3) + (lossThresh * 2);
			let perc = DVrange[1] - c;
			let range = (DVrange[1] - DVrange[0]) + 1;
			let chances = Math.max(c - DVrange[0], -1) + 1;
			if (!chances) {
				return 0;
			} else {
				return Math.min((chances / range).toFixed(2), 1);
			}
		}

		adjustMilitia(value) {
			this.militia += value;
			this.militiaAvailable -= value;
			return this.militia ? this.calcWinPercentage(this.militia) : null;
		}

		confirmExpedition() {
			if (this.isValid()) {
				this.tile.grid.home.modifyPopulace('militiaAvailable', -this.militia);
				this.tile.grid.game.addEvent(this);
				this.confirmed = true;
				this.tile.showOptions();
				this.indicator = makeEventIndicator('expedition', this.tile);
				
			} else {
				console.log('that will never work...');
			}

		}

		cancelExpedition() {
			this.tile.grid.home.modifyPopulace('militiaAvailable', this.militia);
			this.tile.grid.game.removeEvent(this.eventId);
			this.confirmed = false;
			this.clearIndicator();
		}

		clearIndicator(){
			this.tile.ui.removeChild(this.indicator.indicator);
			this.tile.grid.game.animationHook.remove(this.indicator.animation);
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
			let results = this.determineResults();
			if (!results.defeat){
				this.tile.convertMe();
			}
			this.tile.grid.home.modifyPopulace('militia', -results.deaths);
			this.tile.grid.home.modifyPopulace('militiaAvailable', this.militia - results.deaths);
			this.tile.expedition = {};
			this.tile.setListener();
			this.clearIndicator();
			return results;
		}
	}
})

