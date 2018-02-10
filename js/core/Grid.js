define(['home/Home', 'core/Terrain', 'tiles/tileFactory'],
	function(Home, Terrain, TileFactory){
	return class Grid{
		constructor(game){
			this.height = game.height;
			this.width = game.width;
			this.rows = [];
			this.growthRate = game.growthRate;
			this.game = game;
			this.squareSize = game.squareSize;
			this.buildMap();
			this.homeStart = this.makeAField();
			this.home = this.makeHome(this.homeStart, this.homeStart.map(a=>a+1));
		}


		makeAField(){
			let x = ~~(this.width / 2);
			let y = ~~(this.height / 2);
			let tile = this.getTile(x, y);

			tile.getNeighbors().forEach(a=>{
				let b = this.getTile(a[0], a[1])
				b.terrain = 'field';
				if (Math.random() > 0.7){
					b.getNeighbors().forEach(a=>{
						this.getTile(a[0], a[1]).terrain = 'field';
					})
				}

			})
			return [x, y];
		}

		getTile(x, y){
			return this.rows[x][y];
		}

		//should this be somewhere else? --ideally, home should be able to handle this? like, a Home.init()
		makeHome(homeStart, homeEnd){
			let home = new Home(this, homeStart, homeEnd,
			{'food': 20, 'wood': 10, 'silver': 50}, // pass in starting resource values based on difficulty at some point
			{ 'farmers': 2, 'militia': 2, 'militiaAvailable': 2, 'artisans': 1, 'commoners': 2, 'woodsmen': 1 }); // pass in starting resource values based on difficulty at some point
			for (let x = homeStart[0]; x <= homeEnd[0]; x++){
				for (let y = homeStart[1]; y <= homeEnd[1]; y++){
					let starter = TileFactory(
						'civic', x, y, this, this.rows[x][y].terrain)					
					this.replaceTile(x, y, starter)
					home.territory.push(starter);
				}
			}
			home.territory[0].terrain = 'field';
			home.territory[0].build('farm');
			return home;
		}


		convertTile(targetType, x, y, terrain){
			const newTile = TileFactory(targetType, x, y, this, terrain, this.growthRate);
			this.replaceTile(x, y, newTile);
		}

		//coords x, y + target tile
		replaceTile(x, y, tile){
			this.game.map.removeChild(this.rows[x].splice(y, 1, tile))
			tile.makeUI();
			this.game.map.addChild(tile.ui);
			if (this.home && tile.type === 'civic'){
				this.home.territory.push(tile);
			}
		}

		update(){
			for (let col in this.rows){
				for (let square in this.rows[col]){
					this.updateTile(this.rows[col][square]);
				}
			}
		} 


// TODO: Store the functions for each switch case in individual files?? if this gets really big, which it might...

		updateTile(tile){
			if (tile.type === 'wilds'){
				if (!tile.expedition.confirmed){
					tile.expedition = {};
				}
				let chance = 0;
				let value = 1;
				tile.getNeighbors().forEach((a) => {
					if (a.type === 'civic' && this.isExplored != true){
						this.isExplored = true;
					}
					let square = this.getTile(a[0], a[1]);
					chance += square.hasOwnProperty('dangerValue') ? square.getDanger() : 1;	
					})
				if (tile.terrain === 'hills') chance * 6;
				if (tile.terrain === 'forest') chance * 4;
				if (chance > (Math.random() * (tile.growthRate * 10)) + 7.5){
					tile.setDanger(tile.getDanger() + value);
				} 
			} else {
				// civic tiles just do nothing? for now at least
				//though this could be the place where we decide if
				//a civic tile will be destroyed by the wilds
				//alternatively, we could gather relevant resources? (not sure, since citizens won't populate specific tiles)
			}

			tile.render();
		}

		buildMap(){
			for (let x = 0; x < this.width; x++){
				let col = [];
				this.rows.push(col)
				for (let y = 0; y < this.height; y++){
					let square = TileFactory('wilds', x, y, this, 'field', this.growthRate);
					col.push(square);
				}	
			}
			Terrain.generateTerrain(this.rows);
		}
	}
})