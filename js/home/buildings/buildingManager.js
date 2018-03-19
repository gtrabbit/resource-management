define(['home/buildings/farm'], function(Farm){


    return class BuildingManager {
        constructor(){
            this.capAdjustments = {
                'farmers': 0,
                'artisans': 0,
                'woodsmen': 0,
                'militia': 0,
                'militiaAvailable': 0,
                'commoners': 0,
                'total': 0
            }

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
        }

        constructBuilding(buildingType, tile) {
            const building = new this.buildingTypes[buildingType](tile, this.buildingLevels[buildingType]);
            this.addNewBuilding(building);
        }

        addNewBuilding(building) {
            this.buildings[building.type].push(building);
            this.setCapAdjustment(building.benefits.caps)
        }
    }
})