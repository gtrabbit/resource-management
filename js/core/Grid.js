define(['home/Home', 'core/Terrain', 'tiles/tileFactory'],
	function(Home, Terrain, TileFactory){
	return class Grid{
		constructor(game, savedGrid){
			this.height = game.state.height;
			this.width = game.state.width;
			this.growthRate = game.state.growthRate;
			this.game = game;
			this.squareSize = game.squareSize;

			if (!savedGrid){
				this.rows = [];
				this.buildMap();
			} else {
				this.rows = savedGrid.rows;
				this.home = new Home(this, savedGrid.home.resources, savedGrid.home.population, savedGrid.home.popGrowth, savedGrid.home.territory);
			}

			this.game.map.homeLocation = this.homeStart;
			this.game.map.zoomToLocation(this.homeStart);
		}

		extractState(){
			return {
				home: this.home.extractState(),
				rows: this.rows
			}
		}

		makeAField(){
			let x = ~~(this.width / 2);
			let y = ~~(this.height / 2);
			let tile = this.getTile(x, y);
			tile.terrain = 'field';
			tile.getNeighbors().forEach(a=>{
				let b = this.getTile(a[0], a[1])
				b.terrain = 'field';
				if (Math.random() > 0.3){
					b.getNeighbors().forEach(a=>{
						tile = this.getTile(a[0], a[1]);
						tile.terrain = 'field';
						if (Math.random() > 0.5){
							tile.getNeighbors().forEach(a=>{
								if (Math.random() > 0.8) this.getTile(a[0], a[1]).terrain = 'field';
							})
						}
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
			return new Home(this, 
			{'food': 20, 'wood': 10, 'silver': 50, 'popGrowth': 0}, // pass in starting resource values based on difficulty at some point
			{ 'farmers': 2, 'militia': 2, 'militiaAvailable': 2, 'artisans': 1, 'commoners': 2, 'woodsmen': 1 },
			null, null, homeStart, homeEnd); // pass in starting resource values based on difficulty at some point
		
		}


		convertTile(targetType, x, y, terrain){
			const newTile = TileFactory(targetType, x, y, this, terrain, this.growthRate);
			this.replaceTile(x, y, newTile);
		}

		//coords x, y + target tile
		replaceTile(x, y, tile){
			this.game.pleaseSortTiles = true;
			this.game.map.removeChild(this.rows[x].splice(y, 1, tile))
			tile.makeUI();
			if (this.game.stageIsSet){
				tile.render();
			}

			this.game.map.addChild(tile.ui.parent);
			if (this.home && tile.type === 'civic'){
				this.home.addTileToTerritory(tile);
			}
		}

		update(turnNumber){
			for (let col in this.rows){
				for (let square in this.rows[col]){
					this.rows[col][square].takeTurn(turnNumber);
				}
			}
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
			this.homeStart = this.makeAField();
			this.home = this.makeHome(this.homeStart, this.homeStart.map(a=>a+1));
			this.home.setInitialBuildings();
		}
	}
})