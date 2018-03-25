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

            this.buildingLevels = {
                farm: 0
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

        getBuildingCost(type){
            return this.costs[type];
        }

        setCapAdjustment(typeAmount){
            for (let key in typeAmount){
                this.capAdjustments[key] += typeAmount[key]
            }
            this.home.setPopulationCaps(sumObjects(this.basePopulationCaps, this.capAdjustments));
        }

        makeBuilding(buildingType, tile){
            return new this.buildingTypes[buildingType](tile, this.buildingLevels[buildingType]);
        }

        startConstruction(buildingType, tile){
            const building = this.makeBuilding(buildingType);
            this.home.game.addEvent(new Construction(building, tile));
        }

        finishConstruction(building, tile) {
            this.addNewBuilding(building);
            tile.finishConstruction(building);
        }

        addNewBuilding(building) {
            this.buildings[building.type].push(building);
            this.setCapAdjustment(building.benefits.caps)
        }
    }
})