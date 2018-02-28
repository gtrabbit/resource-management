define([], function(){

    return function(screenWidth, screenHeight, upgradeCitizen, downgradeToCommoner){

        const style = new PIXI.TextStyle({
            stroke: 'white',
            align: 'center',
            fill: 'white',
            fontSize: '9pt',
            padding: 3,
        });
    
        const container = new PIXI.Container();
        const backing = new PIXI.Graphics();
    
        const militia =  new PIXI.Text('    Militia    ', style);
		const farmers =  new PIXI.Text('    Farmers    ', style);
		const artisans = new PIXI.Text('    Artisans   ', style);
		const woodsmen = new PIXI.Text('    Woodsmen   ', style);

        const makeAButton = (upOrDown) => new PIXI.Text(upOrDown, style);

        const militiaButtons = makeButtons('militia');
        const farmerButtons = makeButtons('farmers');
        const artisanButtons = makeButtons('artisans');
        const woodsmenButtons = makeButtons('woodsmen');

        function makeButtons(type) {
            const increaseType = makeAButton('+');
            increaseType.interactive = true;
            increaseType.buttonMode = true;
            increaseType.on('click', ()=>{upgradeCitizen('commoners', type)});
            const decreaseType = makeAButton('-');
            decreaseType.interactive = true;
            decreaseType.buttonMode = true;
            decreaseType.on('click', ()=>{downgradeToCommoner(type)});
            return {
                increaseType,
                decreaseType
            }
        }






        //each of these will need a button with an attached method for upgrading citizens...
            //but it might be a better idea to just integrate this with the current display

        //click on citizen-type -> opens up dialog window displaying detailed information about citizen-type -> contained therein are buttons for upgrading / disbanding
    
        const list = [militia, woodsmen, farmers, artisans];
        const buttonList = [militiaButtons, woodsmenButtons, farmerButtons, artisanButtons];
        container.addChild(backing);
		list.forEach((a, i)=>{
            a.position.set(screenWidth - 78, (i*70) + 35);
            buttonList[i].increaseType.position.set(screenWidth - 35, (i*70) + 55);
            buttonList[i].decreaseType.position.set(screenWidth - 55, (i*70) + 55);
            container.addChild(a, buttonList[i].increaseType, buttonList[i].decreaseType);
        });
        
        
        backing.beginFill(0x000000);
        backing.drawRect(screenWidth - 80, 0, 80, screenHeight / 2);
        backing.endFill();
    
        return container;
    }
})