define([], function(){
    return class Artisan {
        constructor(level){
            this.type = 'artisans';
            this.costs = {
                'food': -2,
                'silver': 0,
                'wood': 0,
                'popGrowth': 0
            }
            this.benefits = {
                'popGrowth': 0.05,
                'silver': 5,
                'food': 0,
                'wood': 0
            }

            this.trainingTime = 4;
        }
    }
})