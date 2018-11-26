define(['home/buildings/cabin', 'home/citizens/citizen'], function(Cabin, Citizen){
    return class Woodsman extends Citizen {
        constructor(level){
            super(level, 'woodsmen');
            this.costs = {
                'food': -1,
                'silver': -1,
                'wood': 0,
                'popGrowth': 0
            };
            this.benefits = {
                'popGrowth': 0.02,
                'wood': 5,
                'silver': 0,
                'food': 0
            };
            this.trainingTime = 2;
            this.buildingToUse = Cabin.getTypeName();
        }

        classTurn(buildingYield) {
            let gained = {resources: this.getBenefits()};
            gained.defense = (this.level);
            gained.resources.wood += (this.level * buildingYield);
            return gained;
        }
    }
})