define([], function(){
    return class Militia {
        constructor(level){
            this.costs = {
                'silver': -2,
                'food': -2,
                'wood': 0,
                'popGrowth': 0
            }
            this.benefits = {
                'popGrowth': 0,
                'food': 0,
                'wood': 0,
                'silver': 0
            }
        }
    }
})