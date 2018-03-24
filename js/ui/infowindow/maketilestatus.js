define([], function(){
    return function(tile, style){
        if (tile.type === 'civic'){
            const wrapper = new PIXI.Container();
            const threat = new PIXI.Text("Threat of invasion: " + tile.currentThreat, style);
            const usage = new PIXI.Text(tile.usage, style);
            
        }
    }
})