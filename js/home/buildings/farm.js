define([], function(){

    return class Farm {
        constructor(tile, level){
            this.level = 0;
            this.benefits = {
                caps: {
                    farmers: 5 + (this.level * 2)
                }
            }
            this.tile = tile;
            this.type = 'farm';
            this.costs = {
                wood: -30,
                silver: -15
            }
            this.buildTime = 3;
            this.ui = this.makeUI(this.level);
        }

        getBenefits(type){
            if (type){
                return this.benefits[type];
            } else {
                return this.benefits;
            }
        }

        makeUI(level){
            let ui;
            switch(level){
                case 0:
                default:
                ui = new PIXI.Text('farm', {fontSize: '12'});
                ui.position.set(25, 15);
            }
            return ui;
        }

        upgrade(level){
            this.level = level;
        }
    }
})