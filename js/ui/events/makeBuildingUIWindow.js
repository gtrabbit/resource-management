define([], function(){
    return function(tile, buildingCosts){
        
        return {
            onDismiss: function(){

            },

            recieveStyle: function(style, closingFunction){
                const messageContainer = new PIXI.Container();
                const heading =         new PIXI.Text("Available Buildings:               Costs:", style);
                const headSubtitle =    new PIXI.Text("wood / silver", style);
                const farmMsg =         new PIXI.Text("   Farm                                 " + `${buildingCosts.farm.wood} / ${buildingCosts.farm.silver}`, style);
                const buyFarm =         new PIXI.Text("-- Buy", style);

                heading.position.set(7, 15);
                headSubtitle.position.set(155, 35);
                farmMsg.position.set(5, 60);
                buyFarm.position.set(205, 60);

                messageContainer.addChild(heading, headSubtitle, farmMsg, buyFarm);

                buyFarm.interactive = true;
                buyFarm.buttonMode = true;
                buyFarm.on('pointerover', highlight);

                function highlight(e){
                    e.target.tint = 0xFF5566;
                }
                return messageContainer;
            }
        }
    }
})