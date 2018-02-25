define([], function(){
    return function(type, tile){
        let indicator = new PIXI.Graphics();

        indicator.drawRect(0, 0, 12, 12);
        indicator.pivot.set(6, 6);
        indicator.position.set(8, 8);
        tile.grid.game.animationHook.add(function(delta){
            indicator.rotation += 0.05 * delta;
        })
        return indicator;
    }
})