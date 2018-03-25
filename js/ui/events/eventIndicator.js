define([
    'ui/events/indicators/expeditionIndicator',
    'ui/events/indicators/constructionIndicator'],
    function(expeditionIndicator, constructionIndicator){
    return function(type, tile){
        
        let indicator;

        switch(type){
            case 'expedition':
                indicator = expeditionIndicator();
                break;

            case 'construction':
                indicator = constructionIndicator(indicator);
                break;

            default:
                break
        }

        function addAnimation(animation){
            tile.grid.game.animationHook.add(indicator.eventAnimation);
        }

        function clearAnimation(animation){
            tile.grid.game.animationHook.remove(indicator.eventAnimation);
        }

        indicator.position.set(tile.ui.parent.x + (tile.squareSize / 3), tile.ui.parent.y + (tile.squareSize / 4));
        indicator.on('added', addAnimation);
        indicator.on('removed', clearAnimation);
        indicator.remove = ()=>{
            tile.grid.game.floatLayer.removeChild(indicator);
        };        
        tile.grid.game.floatLayer.addChild(indicator);

        return indicator;
    }
})