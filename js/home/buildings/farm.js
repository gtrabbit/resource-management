define([], function(){

    return class Farm {
        constructor(tile, level){
            this.level = 0;
            this.benefits = {
                caps: {
                    farmers: 10 + (this.level * 5)
                }
            }
            this.tile = tile;
            this.type = 'farm';
        }

        getBenefits(type){
            if (type){
                return this.benefits[type];
            } else {
                return this.benefits;
            }
        }

        upgrade(level){
            this.level = level;
        }
    }
})