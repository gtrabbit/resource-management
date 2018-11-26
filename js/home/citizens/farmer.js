define(['home/buildings/farm', 'home/citizens/citizen'], function(Farm, Citizen){
    return class Farmer extends Citizen {
        constructor(level){
            super(level, 'farmers');
            this.costs = {
                'silver': -1,
                'food': 0,
                'wood': 0,
                'popGrowth': 0,
            };
            this.benefits = {
                'food': 5,
                'popGrowth': 0.04,
                'wood': 0,
                'silver': 0,
            };
            this.trainingTime = 2;            
            this.buildingToUse = Farm.getTypeName();
        }

        classTurn(buildingYield) {
            let gained = {};
            for (let key in this.benefits) {
                if (this.benefits.hasOwnProperty(key)) {
                    gained[key] = this.benefits[key] * buildingYield + this.level;
                }
            }            
            return {resources: gained};
        }
    }
})