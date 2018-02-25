define([], function(){
    return class Commoner {
        constructor(level){
            this.type = 'commoners';
            this.costs = {
                'food': -1,
                'wood': 0,
                'silver': 0,
                'popGrowth': 0
            }
            this.benefits = {
                'popGrowth': 0.1,
                'food': 0,
                'wood': 0,
                'silver': 0,
                
            }

            this.trainingTime = 0;
        }
    }
})