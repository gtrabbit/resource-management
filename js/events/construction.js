define(['events/Timer', 'events/message', 'ui/events/eventIndicator'], function (Timer, Message, EventIndicator) {
    return function (building, tile) {
        const timer = new Timer('construction', building.buildTime);
        const indicator = EventIndicator('construction', tile);
        const resolve = ()=>{
            tile.grid.home.buildingManager.finishConstruction(building, tile);
            const content = building.completionMesg || 'your ' + building.type + ' has been completed!';
            indicator.remove();
            return new Message('Construction complete!', [content]);
        }



        return {timer, resolve, indicator};
    }
})