define([], function(){

    return function(screenWidth, screenHeight){

        const style = new PIXI.TextStyle({
            stroke: 'white',
            align: 'center',
            fill: 'white',
            fontSize: '9pt',
            padding: 3,
        });
    
        const container = new PIXI.Container();
    
        const backing = new PIXI.Graphics();
    

        const militia = new PIXI.Text('Militia\n ', style);
		const farmers = new PIXI.Text('Farmers\n ', style);
		const artisans = new PIXI.Text('Artisans\n ', style);
		const woodsmen = new PIXI.Text('Woodsmen\n ', style);

        //each of these will need a button with an attached method for upgrading citizens...
            //but it might be a better idea to just integrate this with the current display

        //click on citizen-type -> opens up dialog window displaying detailed information about citizen-type -> contained therein are buttons for upgrading / disbanding
    
        let list = [militia, woodsmen, farmers, artisans];

		list.forEach((a, i)=>{
			a.position.set(screenWidth - 90, (i*70) + 35)
        });
        
        container.addChild(backing, militia, farmers, artisans,
			woodsmen, commoners);


        backing.beginFill(0x000000);
        backing.drawRect(screenWidth - 80, 0, 80, screenHeight / 2);
        backing.endFill();
    



        //needs a method to generate the actual interface
            //needs UI for increasing and decreasing all non-commoner citizen-types
    
        
    
        //return value:
            //setter functions to update the display
    

    }
})