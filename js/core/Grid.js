define(['core/Wilds', 'home/Home', 'core/Civic', 'core/Terrain'],
	function(Wilds, Home, Civic, Terrain){
	return class Grid{
		constructor(game){
			this.height = game.height;
			this.width = game.width;
			this.rows = [];
			this.growthRate = game.growthRate;
			this.game = game;
			this.squareSize = game.squareSize;
			this.buildMap();
			this.homeStart = [~~(this.width/2), ~~(this.height/2)]
			this.home = this.makeHome(this.homeStart, this.homeStart.map(a=>a+1));

		}

		makeHome(homeStart, homeEnd){
			let home = new Home(this, homeStart, homeEnd,
			{'food': 20, 'wood': 10, 'silver': 50},
			{'farmers': 2, 'militia': 2, 'artisans': 1, 'commoners': 2, 'woodsmen': 1});
			for (let x = homeStart[0]; x <= homeEnd[0]; x++){
				for (let y = homeStart[1]; y <= homeEnd[1]; y++){
					let starter = new Civic(
						x,
					 	y,
					 	this,
					 	this.rows[x][y].terrain);					
					this.convertTile(x, y, starter)
					home.territory.push(starter);
				}
			}
			home.territory[0].terrain = 'field'
			home.territory[0].build('farm');
			return home
		}

		convertTile(x, y, tile){
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
		} // ends update function


// TODO: Store the functions for each switch case in individual files

		updateTile(tile){
			if (tile.type === 'wilds'){
				let chance = 0;
				let value = 1;
				tile.getNeighbors().forEach((a) => {
					let square = this.rows[a[0]][a[1]];
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
			}

			tile.render();

		}

		buildMap(){
			for (let x = 0; x < this.width; x++){
				let col = [];
				this.rows.push(col)
				for (let y = 0; y < this.height; y++){
					let square = new Wilds(x, y, this, 'field', this.growthRate);
					col.push(square);
				}	
			}
			Terrain.generateTerrain(this.rows)
		} //ends build
	}
})