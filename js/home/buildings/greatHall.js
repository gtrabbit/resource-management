define(['ui/home/buildings/greatHallUI', 'home/buildings/buildingBase', 'ui/events/messages/purchase-unavailable'],
    function(GreatHallUI, Building, PurchaseUnavailable){

        const typeName = 'greatHall';

    return class GreatHall extends Building {
        constructor(tile, level){
            super(tile, level, typeName);
            this.benefits = this.setBenefits();
            this.type = typeName;
            this.displayName = 'great hall';
            this.buildTime = 10;
            this.buildingYield = 1;
            this.currentLoad = 0;
            if (tile) { //if we pass a tile, then we know this is an actual implementation and should build the UI
                this.ui = new GreatHallUI(tile, level);  
            }
        }

        static getCosts(level) {
            const costs = [
                {wood: 0, silver: 0},
                {wood: -100, silver: -150},
                {wood: -200, silver: -300},
                {wood: -400, silver: -600},
                {wood: -800, silver: -1200}
            ];
            return level !== undefined 
                ? costs[level]
                : costs;
        }

        static isAvailable(state) {
            return state.home.buildings.greatHall.length === 0;
        }

        static getTypeName() {
            return typeName;
        }

        typeUse() {
            this.currentLoad++;
        }

        levelUp(level) {
            
        }

        setBenefits() {
            this.benefits = {
                caps: {
                    citizenCapacity: 10 + (this.level * 3),
                    militaryCapacity: 5 + (this.level * 2)
                }

            };
            return this.benefits;
        }

        getAvailableUpgradeCosts(state) {
            return this.costs.slice(1).map((cost, i) => {
                switch (i) {
                    case 0:
                        return Object.keys(state.home.buildings)
                            .every(a =>  state.home.buildings[a].length > 0) 
                            ? cost 
                            : new PurchaseUnavailable("You must have constructed at least one each of: farm, house, market, cabin, tower");
                    break;

                    default:
                        console.log("something went wrong.... help!");
                        return false;
                }
            })
        }

        reset() {
            this.currentLoad = 0;
        }

    }
})