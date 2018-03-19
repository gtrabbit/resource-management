define([], function(){
    return function(tile, buildingCosts){
        
        return {
            onDismiss: function(){ //this is bound to tile
                //do something?
            },

            recieveStyle: function(style, closingFunction){
                const messageContainer = new PIXI.Container();
                const heading =         new PIXI.Text("Available Buildings:               Costs:", style);
                const headSubtitle =    new PIXI.Text("wood / silver", style);
                const farmMsg =         new PIXI.Text("   Farm                                 " + `${-buildingCosts.farm.wood} / ${-buildingCosts.farm.silver}`, style);
                const buyFarm =         new PIXI.Text("-- Buy", style);
                buyFarm.name = 'farm';

                heading.position.set(7, 15);
                headSubtitle.position.set(155, 35);
                farmMsg.position.set(5, 60);
                buyFarm.position.set(205, 60);

                messageContainer.addChild(heading, headSubtitle, farmMsg, buyFarm);

                buyFarm.interactive = true;
                buyFarm.buttonMode = true;
                buyFarm.on('pointerover', highlight);
                buyFarm.on('click', purchase);

                function purchase(e){
                    if (tile.build(e.target.name)){
                        closingFunction();
                    } else {
                        console.log('not enough resources!')
                    }
                    
                }
                

                function highlight(e){
                    e.target.scale.set(1.1, 1.1);
                    buyFarm.on('pointerout', unhighlight.bind(e.target));
                }

                function unhighlight(){
                    this.scale.set(1, 1);
                }

                return messageContainer;
            }
        }
    }
})