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

        const width = tile.squareSize;
        const height = tile.squareSize * (1 / 1.618); //practical use of the golden mean

        ui.lineStyle(1, 0x000, 1);
        ui.drawPolygon(0,height/2, width/2,0, width,height/2, width/2,height);


        ui.endFill();
        ui.x = ((tile.x * width)  - (tile.y * width))/2;
        ui.y = ((tile.y * height) + (tile.x * height))/2;
   
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