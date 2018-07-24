define([], function(){
    return function(tile, level){
        const mapSprite = new PIXI.Text('farm', {fontSize: '12'});
        mapSprite.position.set(25, 15);
        return mapSprite;
    }
})