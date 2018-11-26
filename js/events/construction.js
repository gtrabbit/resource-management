define(['events/Timer', 'events/message', 'ui/events/eventIndicator'], function (Timer, Message, EventIndicator) {
    return function (building, tile, isUpgrade) {
        const timer = new Timer('construction', building.buildTime);
        const indicator = EventIndicator('construction', tile); //subject to change if we get some more animations....
        const content = isUpgrade ? (building.upgradeCompletionMsg || `Your ${building.type} has been upgraded.`) : building.completionMesg || 'your ' + building.type + ' has been completed!';
        const title = isUpgrade ? "Upgrade complete!" : "Construction complete!"
        const resolve = () => {
            if (isUpgrade) {
                tile.grid.home.buildingManager.finishUpgrade(building, tile);
            } else {
                tile.grid.home.buildingManager.finishConstruction(building, tile);
            }
            
            indicator.remove();
            return new Message(title, [content]);
        }

        return {timer, resolve, indicator};
    }
})