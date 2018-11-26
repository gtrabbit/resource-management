define(['ui/home/buildings/buildingInfoWindow'], function(buildingInfoWindow){

    return class Building {
        constructor(tile, level, type){
            this.buildingYield = 0.3;
            if (tile) {
                this.UID = tile.UID + type;
                this.tile = tile;
                this.level = level || 0;
            }
        }

        getBenefits(type){
            if (type){
                return this.benefits[type];
            } else {
                return this.benefits;
            }
        }

        getYield() {
            return this.buildingYield;
        }

        upgrade() {
            if (this.tile.upgrade(this.type, this.level + 1)) {
                this.levelUp(this.level);
                this.setBenefits(this.level);
                return true;
            } 
            return false;
        }

        completeUpgrade(level){
            this.level = level;
            this.setBenefits(level);
            //do other stuff?
        }

        canUse() {
            return this.capacity > this.currentLoad;
        }

        use() {
            if (this.canUse()) {
                this.typeUse();
                return this;
            }
            return false;
        }

        takeTurn() {
            
        }

        openUI(){                               //make sure this v is generic
            this.tile.grid.game.infoWindow.openWith(buildingInfoWindow(this), this.tile);
        }
    }
})