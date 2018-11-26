define(['ui/home/buildings/cabinUI', 'home/buildings/buildingBase'], function(cabinUI, Building){

    const typeName = 'cabin';
    
    return class Cabin extends Building {
        constructor(tile, level){
            super(tile, level, typeName);
            this.benefits = this.setBenefits();
            this.type = typeName;
            this.displayName = 'cabin';
            this.buildTime = 2;
            this.buildingYield = 1;
            this.currentLoad = 0;
            this.capacity = 2;
            if (tile) { //if we pass a tile, then we know this is an actual implementation and should build the UI
                this.ui = new cabinUI(tile, level);  
            }
        }

        static getCosts(level) {
            const costs = [
                {wood: -30, silver: -15},
                {wood: -30, silver: -20},
                {wood: -40, silver: -25},
                {wood: -60, silver: -30},
                {wood: -80, silver: -40}
            ];
            return level !== undefined 
                ? costs[level]
                : costs;
        }

        static isAvailable(state) {
            return true;
        }

        static getTypeName() {
            return typeName;
        }

        typeUse() {
            this.currentLoad++;
        }

        levelUp(level) {
            this.capacity += level;
            this.buildingYield = Math.round(1 + (level / 3));
        }

        setBenefits() {
            this.benefits = {};
            return this.benefits;
        }

        reset() {
            this.currentLoad = 0;
        }

    }
})