define([], function(){
    return function(tile){

        let ui = new PIXI.Graphics();

        switch (tile.terrain) {
            case 'field':
                ui.beginFill(0xbab521); //yellowish
                break;

            case 'forest':
                ui.beginFill(0x196817); //greenish
                break;

            case 'hills':
                ui.beginFill(0x72613d);  //brown-grey
                break;
        }

        ui.lineStyle(1, 0x000, 1);
        ui.drawRect(
            0,
            0,
            tile.squareSize,
            tile.squareSize)

        ui.endFill();
        ui.x = tile.x * tile.squareSize;
        ui.y = tile.y * tile.squareSize;


        let dot = new PIXI.Graphics();
        dot.beginFill(0xFF0000);

        dot.drawCircle(0, 0, 2);
        dot.endFill();
        dot.alpha = 0;
        dot.x = 5;
        dot.y = 5;
        ui.addChild(dot)
        return ui;
    }
})