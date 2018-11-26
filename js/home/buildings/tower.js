define(['ui/home/buildings/towerUI', 'home/buildings/buildingBase'], function(towerUI, Building){

    const typeName = 'tower';

    return class Tower extends Building {
        constructor(tile, level){
            super(tile, level, typeName);
            this.benefits = this.setBenefits();
            this.type = typeName;
            this.displayName = 'tower';
            this.buildTime = 3;
            this.buildingYield = 1;
            this.currentLoad = 0;
            this.capacity = 3;
            if (tile) { //if we pass a tile, then we know this is an actual implementation and should build the UI
                this.ui = new towerUI(tile, level);  
            }
        }

        static getCosts(level) {
            const costs = [
                {wood: -20, silver: -5},
                {wood: -40, silver: -10},
                {wood: -55, silver: -25},
                {wood: -100, silver: -40},
                {wood: -150, silver: -65}
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
            this.capacity = 3 + level;
            this.buildTime = level + 3;
            this.buildingYield = Math.round(1 + (level / 2));
        }

        setBenefits() {
            this.benefits = {
                defense: (this.level * 2) + 4
            };
            return this.benefits;
        }

        reset() {
            this.currentLoad = 0;
        }

    }
})