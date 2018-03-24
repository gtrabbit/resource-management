define(['events/Timer', 'events/message'], function (Timer, Message) {
    return function (building, tile) {
        const timer = new Timer('construction', building.buildTime);
        const resolve = ()=>{
            tile.grid.home.buildingManager.finishConstruction(building, tile);
            const content = building.completionMesg || 'your ' + building.type + ' has been completed!';
            return new Message('Construction complete!', [content]);
        }

        return {timer, resolve};
    }
})