define([], function(){
    return function(type, tile){
        
        const indicator = new PIXI.Container();
        const sword1 = new PIXI.Sprite.fromImage('./assets/sword.png');
        const sword2 = new PIXI.Sprite.fromImage('./assets/sword.png');

        sword1.height = 15;
        sword1.width = 15;
        sword1.anchor.set(0.5,0.5);
        indicator.addChild(sword1);

        sword2.height = 15;
        sword2.width = 15;
        sword2.anchor.set(0.5,0.5);
        indicator.addChild(sword2);
        sword2.rotation = 1;

        indicator.position.set(tile.ui.parent.x + (tile.squareSize / 3), tile.ui.parent.y + (tile.squareSize / 4));
        indicator.on('added', addAnimation);
        indicator.on('removed', clearAnimation);

        tile.grid.game.floatLayer.addChild(indicator);

        function spin(delta){
            indicator.rotation += 0.05 * delta;
        }
        function addAnimation(){
            tile.grid.game.animationHook.add(spin);
        }
        function clearAnimation(){
            tile.grid.game.floatLayer.removeChild(indicator);
            tile.grid.game.animationHook.remove(spin);
        }

        indicator.remove = clearAnimation;
  
        return indicator;
    }
})