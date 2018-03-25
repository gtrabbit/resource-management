define([], function(){
    return function(){
        const indicator = new PIXI.Container();
        const sword1 = new PIXI.Sprite.fromImage('./assets/sword.png');
        const sword2 = new PIXI.Sprite.fromImage('./assets/sword.png');
        sword1.height = 15;
        sword1.width = 15;
        sword1.anchor.set(0.5,0.5);
        indicator.addChild(sword1);        
        sword2.height = 15;
        sword2.width = 15;
        sword2.anchor.set(0.5,0.5);
        indicator.addChild(sword2);
        sword2.rotation = 1;
        indicator.eventAnimation = (delta)=>{
            indicator.rotation += 0.05 * delta;
        };
        return indicator;
    }
})