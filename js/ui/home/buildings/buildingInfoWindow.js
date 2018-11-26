define(['utils/fromCamelCase'], function(fromCamelCase){
    return function(building){
        
        return {
            onDismiss: function(){ //this is bound to tile
                //do something?
            },

            recieveStyle: function(style) {                
                const messageContainer = new PIXI.Container();
                const heading = new PIXI.Text(fromCamelCase(building.type, true) + "(Level " + building.level + ")", style);
                const upgrade = new PIXI.Text("Upgrade", style);

                heading.position.set(7, 15);
                upgrade.position.set(7, 30);
                messageContainer.addChild(heading, upgrade);

                upgrade.interactive = true;
                upgrade.buttonMode = true;
                upgrade.on('pointerover', highlight);
                upgrade.on('click', purchase.bind(this));

                function purchase(e){
                    if (building.upgrade(building.level + 1)){
                        this.close();
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