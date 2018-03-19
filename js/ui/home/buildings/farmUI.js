define(['ui/infowindow/maketextbox'], function(textbox){
    return function(){
        const farm = textbox(new PIXI.Text('Farm'));
        return farm;
    }
})