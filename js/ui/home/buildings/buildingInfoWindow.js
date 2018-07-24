define(['utils/toTitleCase'], function(toTitleCase){
    return function(building){
        
        return {
            onDismiss: function(){ //this is bound to tile
                //do something?
            },

            recieveStyle: function(style, closingFunction){
                const messageContainer = new PIXI.Container();
                const heading = new PIXI.Text(toTitleCase(building.type) + "(Level " + building.level + ")", style);
                const upgrade = new PIXI.Text("Upgrade", style);

                heading.position.set(7, 15);
                

                messageContainer.addChild(heading);

                upgrade.interactive = true;
                upgrade.buttonMode = true;
                upgrade.on('pointerover', highlight);
                upgrade.on('click', purchase);

                function purchase(e){
                    if (building.canUpgrade(building.level + 1)){
                        closingFunction();
                    } else {
                        console.log('not enough resources!')
                    }
                    
                }
                function highlight(e){
                    e.target.scale.set(1.1, 1.1);
                    upgrade.on('pointerout', unhighlight.bind(e.target));
                }

                function unhighlight(){
                    this.scale.set(1, 1);
                }

                return messageContainer;
            }
        }
    }
})