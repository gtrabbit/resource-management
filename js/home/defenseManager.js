define([], function() {
    return class DefenseManager {
        constructor(home) {
            this.home = home;
            this.baseDefense = 0;
            this.defenseModifier = 0;
        }

        modifyDefense(newValue) {
            this.baseDefense += newValue;
            return this.getDefense();
        }

        getDefense() {
            return this.baseDefense;
        }

        modifyDefenseModifier(newValue) {
            this.defenseModifier += newValue;
            return this.getDefenseModifier();
        }

        getDefenseModifier() {
            return this.defenseModifier;
        }

        
        getTotalDefense() {
            return this.baseDefense + this.getDefenseModifier();
        }

        determineLosses(def){ //more here some day, obviously			
			return this.findPerimeterDanger(this.territory)
		}

		findPerimeterDanger(territory){
			// const surroundingSquares = {};
			// territory.forEach(a=>{
			// 	let individualDanger = 0;
			// 	a.getNeighbors().forEach(a=>{
			// 		let tile = this.grid.rows[a[0]][a[1]];
			// 		if (tile.type === 'wilds'){
			// 			surroundingSquares[tile.UID] = tile.getDanger();
			// 			individualDanger += tile.getDanger();
			// 		}	
			// 	})
			// 	a.currentThreat = individualDanger;
			// })
			// let total = 0;
			// for (let key in surroundingSquares){
			// 	total += surroundingSquares[key];
			// }
			// return total;
		}

    }
})