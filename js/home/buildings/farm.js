define(['ui/home/buildings/farmUI', 'ui/home/buildings/buildingInfoWindow'], function(farmUI, buildingInfoWindow){

    return class Farm {
        constructor(tile, level){
            this.benefits = this.setBenefits(level);
            this.type = 'farm';
            this.costs = [
                {wood: -30, silver: -15},
                {wood: -30, silver: -20},
                {wood: -40, silver: -25},
                {wood: -60, silver: -30},
                {wood: -80, silver: -40}
            ];
            this.buildTime = 3;
            if (tile) {
                this.tile = tile;
                this.level = level;
                this.ui = new farmUI(tile, level);  
            }
        }

        //all the methods here seem generic to buildings.... consider making a base class or composing this somehow

        getBenefits(type){
            if (type){
                return this.benefits[type];
            } else {
                return this.benefits;
            }
        }

        upgrade() {
            return this.tile.upgrade(this.type, this.level + 1);
        }

        completeUpgrade(level){
            
            this.level = level;
            this.setBenefits(level);
            //do other stuff?
        }

        openUI(){                               //make sure this v is generic
            this.tile.grid.game.infoWindow.openWith(buildingInfoWindow(this), this.tile);
        }

        //methods specific to farms...

        setBenefits(level) {
            return {
                caps: {
                    farmers: 5 + (level * 2)
                }
            }
        }
    }
})