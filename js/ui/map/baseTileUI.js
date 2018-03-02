define([], function(){



    return function(tile){
 
        const hills = new PIXI.Texture.fromImage('./assets/tinyhills.png');
        const field = new PIXI.Texture.fromImage('./assets/tinyplains2.png');
        const forest = new PIXI.Texture.fromImage('./assets/tinytrees.png');

        let ui = new PIXI.Graphics();

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


        //uncomment if we want to see the outlines...
        // ui.beginFill(0x72613d);
        // ui.lineStyle(1, 0x000, 1);
        // ui.drawPolygon(0, height / 2, width / 2, 0, width, height / 2, width / 2, height);
        // ui.endFill();


        let sprite = new PIXI.Sprite(uiTexture);
        sprite.height = 110;
        sprite.width = 120;
        sprite.x = -width / 4;
        sprite.y = -height + 20;
       
       // sprite.anchor = [1, 1];
       // sprite.scale = 2;
        ui.addChild(sprite);

   


        ui.x = ((tile.x * width) / 2) - (tile.y * width / 2);
        ui.y = (((tile.y) * (height)) + (tile.x * height)) / 2;


    
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