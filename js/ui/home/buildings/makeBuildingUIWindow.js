define(['utils/fromCamelCase'], function(fromCamelCase){
    return function(tile, buildings){
        let buildingCosts = buildings.reduce((result, b) => {
            result[b.getTypeName()] = b.getCosts(0);
            return result;
        }, {});
        return {
            onDismiss: function(){ //this is bound to tile
                //do something?
            },

            recieveStyle: function(style){
                const assignListeners = (buyBuildingType) => {
                    buyBuildingType.on('pointerover', highlight.bind(buyBuildingType));
                    buyBuildingType.on('click', purchase.bind(this));
                }

                const messageContainer = new PIXI.Container();
                const heading =         new PIXI.Text("Available Buildings:               Costs:", style);
                const headSubtitle =    new PIXI.Text("wood / silver", style);
                this.labels = [];

                let index = 0;
                for (let key in buildingCosts) {
                    if (buildingCosts.hasOwnProperty(key)) {
                        let buildingTypeName = fromCamelCase(key, true);
                        let costWrapper = new PIXI.Container();
                        let buildingName =  new PIXI.Text(buildingTypeName, style);
                        buildingName.position.x = 5;
                        let spacing = 100 - buildingTypeName.length * 0.8;
                        const woodCostString = "" + buildingCosts[key].wood;
                        let woodCost = new PIXI.Text(`${-buildingCosts[key].wood}`, style);
                        
                        woodCost.position.x = spacing;                        
                        let slash = new PIXI.Text("/", style);
                        slash.position.x = spacing + woodCostString.length + 10;
                        let silverCost = new PIXI.Text(`${-buildingCosts[key].silver}`, style);
                        silverCost.position.x = spacing + 20;
                        costWrapper.addChild(buildingName, silverCost, slash, woodCost);
                        costWrapper.name = key + "-wrapper";
                        let buyBuildingType =  new PIXI.Text("-- Buy", style);
                        buyBuildingType.name = key;
                        costWrapper.position.set(5, 60 + (index * 18));
                        buyBuildingType.position.set(205, 60 + (index * 18));
                        buyBuildingType.interactive = true;
                        buyBuildingType.buttonMode = true;
                        assignListeners(buyBuildingType);
                        messageContainer.addChild(buyBuildingType, costWrapper);
                        this.registerLabel(costWrapper);
                        index++;
                    }
                }
                
                heading.position.set(7, 15);
                headSubtitle.position.set(135, 35);
                messageContainer.addChild(heading, headSubtitle);

                function purchase(e){
                    if (tile.build(e.target.name)){
                        this.close();
                    } else {
                        this.warn(e.target.name);
                    }
                }
                
                function highlight(e){
                    e.target.scale.set(1.1, 1.1);
                    this.on('pointerout', unhighlight.bind(e.target));
                }

                function unhighlight(e){
                    this.scale.set(1, 1);
                }

                return messageContainer;
            }
        }
    }
})