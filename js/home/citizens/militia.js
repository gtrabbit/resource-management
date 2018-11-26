define(['home/buildings/tower', 'home/citizens/citizen'], function(Tower, Citizen){
    return class Militia extends Citizen {
        constructor(level){
            super(level, 'militia');
            this.costs = {
                'silver': -2,
                'food': -2,
                'wood': 0,
                'popGrowth': 0
            };
            this.benefits = {
                'popGrowth': 0,
                'food': 0,
                'wood': 0,
                'silver': 0
            };

            this.trainingTime = 3;            
            this.buildingToUse = Tower.getTypeName();
        }

        classTurn(buildingYield) {
            let gained = {defense: 3 + (buildingYield * this.level)}; 
            return gained;
        }
    }
})