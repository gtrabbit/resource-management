define(['home/buildings/farm',
        'events/construction',
        'utils/sumObjects'], function(Farm, Construction, sumObjects){


    return class BuildingManager {
        constructor(home){
            this.home = home;

            this.capAdjustments = {
                'farmers': 0,
                'artisans': 0,
                'woodsmen': 0,
                'militia': 0,
                'militiaAvailable': 0,
                'commoners': 0,
                'total': 0
            }

            this.basePopulationCaps = home.basePopulationCaps;

            this.farm = new Farm();

            this.buildingTypes = {
                farm: Farm
            }

            this.costs = {
                farm: this.farm.costs
            }

            this.buildings = {
                farm: []
            }
        }

        getCapAdjustment(type){
            return this.capAdjustments[type];
        }

        getBuildingCost(type, level = 0){
            return type ? this.costs[type][level] : this.costs;
        }

        setCapAdjustment(typeAmount){
            for (let key in typeAmount){
                this.capAdjustments[key] += typeAmount[key]
            }
            this.home.setPopulationCaps(sumObjects(this.basePopulationCaps, this.capAdjustments));
        }

        makeBuilding(buildingType, tile, level = 0){
            return new this.buildingTypes[buildingType](tile, level);
        }

        startConstruction(buildingType, tile, level, isUpgrade){
            const building = this.makeBuilding(buildingType, tile, level);
            this.home.game.addEvent(new Construction(building, tile, isUpgrade));
        }

        finishConstruction(building, tile) {
            this.addNewBuilding(building);
            tile.finishConstruction(building);
        }

        finishUpgrade(building, tile) {
            this.replaceBuilding(building);
            tile.finishUpgrade(building);
        }

        addNewBuilding(building) {
            this.buildings[building.type].push(building);
            this.setCapAdjustment(building.benefits.caps)
        }

        replaceBuilding(building) {
            //oh shit. just realized I'm going to need to pass through a reference to the previous building....
            //maybe better just to call this directly on the building itself?
        }
    }
})