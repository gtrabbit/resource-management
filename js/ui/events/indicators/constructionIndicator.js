define([], function(){
    return function(){
        const indicator = new PIXI.Container();
        const building = new PIXI.Text('B');
        building.position.set(5, -20);
        indicator.addChild(building);
        indicator.waveFrame = 1;
        indicator.eventAnimation = (delta)=>{
            indicator.waveFrame += delta;
            building.alpha = Math.cos(indicator.waveFrame / 18);
            if (indicator.waveFrame > 500){
                indicator.waveFrame = 0;
                building.text = 'B';
            } else if (indicator.waveFrame > 400){
                building.text = 'B...';
            } else if (indicator.waveFrame > 300) {
                building.text = 'B..';
            } else if (indicator.waveFrame > 100){
                building.text = 'B.';
            }
        };
        return indicator;
    }
})