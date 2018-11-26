define([], function(){
    return class Citizen {
        constructor(level = 0, type){
            this.type = type;
            this.level = level;       
        }

        takeTurn(buildingYield = 0.3) {
            return this.classTurn(buildingYield);
        }

        classTurn() {
            //kinda makes this abstract.....
        }

        getBuildingType() {
            return this.buildingToUse;
        }

        getBenefits(type) {
            return type ? this.benefits[type] : this.benefits;
        }

        getCosts(type) {
            return type ? this.costs[type] : this.costs;
        }
    }
})