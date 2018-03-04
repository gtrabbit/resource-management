define([], function(){

    return function makeInfoWindow(){
        let infoWindow = new PIXI.Container();
        let box = new PIXI.Graphics();
        infoWindow.addChild(box);

        infoWindow.close = function(){
            
        }

        infoWindow.on('click', function(e){
            e.stopPropogation();
        })

        return infoWindow;
    }
})