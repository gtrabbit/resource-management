define(['home/buildings/house',  'home/citizens/citizen'], function(House, Citizen){
    return class Commoner extends Citizen {
        constructor(level){
            super(level, 'commoners');
            this.costs = {
                'food': -1,
                'wood': 0,
                'silver': 0,
                'popGrowth': 0
            };
            this.benefits = {
                'popGrowth': 0.1,
                'food': 0,
                'wood': 0,
                'silver': 0                
            };
            this.trainingTime = 0;
            this.buildingToUse = House.getTypeName();
        }

        classTurn(buildingYield) {
            let gained = this.getBenefits();
            gained.popGrowth += Math.floor((buildingYield + this.level) / 10);            
            return {resources: gained};
        }
    }
})