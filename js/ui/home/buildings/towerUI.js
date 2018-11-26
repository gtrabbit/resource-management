define([], function(){
    return function(tile, level){
        const spriteWrapper = new PIXI.Container();
        const mapSprite = new PIXI.Text(`Tower(${level})`, {fontSize: '12pt'});
        mapSprite.position.set(tile.squareSize / 5, tile.squareSize / 5);             
        spriteWrapper.addChild(mapSprite);
        return spriteWrapper;
    }
})