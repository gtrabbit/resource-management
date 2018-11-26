define(['home/buildings/greatHall', 'utils/cloneObject', 'home/buildings/basic-buildings',
    'utils/invertSign'],
    function(GreatHall, cloneObject, basicBuildings, invertSign){
        const {farm: Farm, house: House, market: Market, tower: Tower, cabin: Cabin} = basicBuildings.classes;        
    return class BuildingManager {
        constructor(home){            
            this.home = home;
            this.buildingTypes = {
                farm: Farm,
                greatHall: GreatHall,
                house: House,
                market: Market,
                tower: Tower,
                cabin: Cabin
            };
            this.buildingLayer = home.game.buildingLayer;
            this.buildings = {
                farm: [],
                market: [],
                cabin: [],
                tower: [],
                house: [],
                greatHall: []
            };
        }

        getBuildingCost(type, level = 0){
            return type ? this.buildingTypes[type].getCosts(level) : false;
        }

        getAllBuildingCosts() {
            const costs = {};
            for (let key in this.buildingTypes) {
                if (this.buildingTypes.hasOwnProperty(key)) {
                    costs[key] = this.buildingTypes[key].getCosts();
                }
            }
            return costs;
        }

        getAllBuildings() {
            return cloneObject(this.buildings);
        }

        getBuildingsAvailableToBuild(state) {            
            return Object.keys(this.buildingTypes).reduce((result, building) => {
                if (this.buildingTypes[building].isAvailable(state)){
                    result.push(this.buildingTypes[building]);
                }
                return result;
            }, []);
        }

        makeBuilding(buildingType, tile, level = 0){
            return new this.buildingTypes[buildingType](tile, level);
        }

        startConstruction(buildingType, tile, level){
            return this.makeBuilding(buildingType, tile, level);
        }

        removeBuilding(buildingUID, buildingType) {
            const removed = this.buildings[buildingType].splice(this.buildings[buildingType].findIndex(a => a.UID === buildingUID), 1)[0];
            const lostCapBenefits = invertSign(removed.getBenefits('caps'));
            this.home.modifyPopulationCaps(lostCapBenefits);
            const lostDefenseBenefits = removed.getBenefits('defense') * -1;
            this.home.modifyDefense(lostDefenseBenefits);
            return removed;
        }

        finishConstruction(building, tile) {
            tile.finishConstruction(building);
            this.placeBuildingUI(building, tile);
            return this.addNewBuilding(building, tile);
        }

        finishUpgrade(building, tile) {
            const formerBuilding = tile.finishUpgrade(building);
            this.removeBuildingUI(formerBuilding);
            this.placeBuildingUI(building, tile);
            return this.replaceBuilding(building, tile);            
        }

        addNewBuilding(building) {
            this.buildings[building.type].push(building);
            const benefits = building.getBenefits();
            if (benefits.hasOwnProperty('caps')) {
                this.home.modifyPopulationCaps(benefits.caps);
            }
            if (benefits.hasOwnProperty('defense')) {
                this.home.modifyDefense(benefits.defense);
            }
            return building;
        }

        replaceBuilding(building, tile) {
            this.removeBuilding(building.UID, building.type);
            const replaced = this.addNewBuilding(building);
            return replaced;
        }

        getNextAvailableBuilding(buildingType) {
            if (!buildingType) {
                console.log("argument \'buildingType\' is required.")
                return null;
            }
            return this.buildings[buildingType].find(building => building.use());
        }

        placeBuildingUI(building, tile) {
			const coords = tile.getSpritePosition();
			building.ui.position.set(coords.x, coords.y);
			this.buildingLayer.addChild(building.ui);
        }
        
        removeBuildingUI(building) {
            this.buildingLayer.removeChild(building.ui);
        }

        update() {
            for (let type in this.buildings) {
                if (this.buildings.hasOwnProperty(type)) {
                    this.buildings[type].forEach(b => b.reset());
                }
            }
        }
    }
})