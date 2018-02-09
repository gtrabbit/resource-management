define([], function(){
	return function(){
		const style = new PIXI.TextStyle({
			stroke: 'white',
			align: 'center',
			fill: 'white',
			fontSize: '9pt',
			padding: 3,
		})

		const container = new PIXI.Container();
		const militia = new PIXI.Text('Militia\n 0 /      ', style);
		const militiaAvailable = new PIXI.Text('(0)', style);
		const farmers = new PIXI.Text('Farmers\n 0', style);
		const artisans = new PIXI.Text('Artisans\n 0', style);
		const woodsmen = new PIXI.Text('Woodsmen\n 0', style);
		const commoners = new PIXI.Text('Commoners\n 0', style);
		const silver = new PIXI.Text('Silver\n 0', style);
		const wood = new PIXI.Text('Wood\n 0', style);
		const food = new PIXI.Text('Food\n 0', style);
		let list = [commoners, militia, woodsmen, farmers,
			artisans, silver, wood, food];

		list.forEach((a, i)=>{
			if (i===1){
				i = 1.2;
			}
			a.position.set(15 + (i*70), 5)
		})

		militiaAvailable.position.set(117, 18);
		const backing = new PIXI.Graphics();

		container.addChild(backing, militia, militiaAvailable, farmers, artisans,
			woodsmen, commoners, silver, wood, food);
		
		let size = container.getBounds();
		
		backing.beginFill(0x000000);
		backing.drawRect(0,0, 600, size.height+10);
		backing.endFill();
		
		return {
			container,
			militia,
			militiaAvailable,
			farmers,
			artisans,
			woodsmen,
			commoners,
			silver,
			wood,
			food,
		}
	}


})