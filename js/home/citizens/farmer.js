define([], function(){
    return class Farmer {
        constructor(level){
            this.costs = {
                'silver': -1,
                'food': 0,
                'wood': 0,
                'popGrowth': 0,
            }
            this.benefits = {
                'food': 5,
                'popGrowth': 0.04,
                'wood': 0,
                'silver': 0,
            }
        }
    }
})