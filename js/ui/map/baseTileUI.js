define([], function(){



    return function(tile){
 
        const hills = new PIXI.Texture.fromImage('./assets/tinyhills.png');
        const field = new PIXI.Texture.fromImage('./assets/tinyplains.png');
        const forest = new PIXI.Texture.fromImage('./assets/tinytrees.png');
    

        const width = tile.squareSize;
        const height = tile.squareSize * (1 / 1.618); //practical use of the golden mean

        let uiTexture;

        switch (tile.terrain) {
            case 'field':
                uiTexture = field; //yellowish
                break;

            case 'forest':
                uiTexture = forest; //greenish
                break;

            case 'hills':
                uiTexture = hills;  //brown-grey
                break;
        }

        let ui = new PIXI.Sprite(uiTexture);
        ui.height = height * 2;
        ui.width = width * 2;
   


        ui.x = ((tile.x * width)  - (tile.y * width)) / 1.5;
        ui.y = ((tile.y * height) + (tile.x * height)) / 1.5;

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