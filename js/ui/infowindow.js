define([], function(){

    return function makeInfoWindow(){
        let infoWindow = new PIXI.Container();
        let box = new PIXI.Graphics();
        infoWindow.addChild(box);
        return infoWindow;
    }
})