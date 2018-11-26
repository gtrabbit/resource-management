define(['home/buildings/market', 'home/citizens/citizen'], function(Market, Citizen){
    return class Artisan extends Citizen {
        constructor(level){
            super(level, 'artisans');            
            this.costs = {
                'food': -2,
                'silver': 0,
                'wood': 0,
                'popGrowth': 0
            };
            this.benefits = {
                'popGrowth': 0.05,
                'silver': 5,
                'food': 0,
                'wood': 0
            };
            this.trainingTime = 4;
            this.buildingToUse = Market.getTypeName();
        }

        classTurn(buildingYield) {
            let gained = this.getBenefits();
            gained.silver *= Math.ceil((buildingYield + this.level) / 3);
            return {resources: gained};
        }
    }
})