define([], function(){
    return class Woodsman {
        constructor(level){
            this.type = 'woodsman';
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
        }
    }
})