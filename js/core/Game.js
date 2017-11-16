define(['core/Grid'], function(Grid){
	

	return class Game{
		constructor(growthRate, width, height, stage, renderer){
			this.growthRate = growthRate;
			this.width = width;
			this.height = height;
			this.stage = stage;
			this.squareSize = 32;
			this.map = this.makeMap();
			this.renderer = renderer;
			this.turns = 0;
			this.infoWindow = this.makeInfoWindow();
			this.grid = new Grid(this);
			this.events = [];
			this.basicFontStyle = {
					fontFamily: 'Georgia',
					fontSize: 14,
					wordWrap: true,
					wordWrapWidth: 230,
					padding: 10
				}  //just for now. something better later for sure
				
		}

		makeMap(){
			let map = new PIXI.Container();
			map.interactive = true;
			map.x = this.width*(this.squareSize/2) + 20;
			map.y = this.height*(this.squareSize/2) + 20;
			map.pivot.set(this.width*(this.squareSize/2) + 20, this.height*(this.squareSize/2) + 20)
			map
				.on('pointerdown', onDragStart)
				.on('pointerup', onDragEnd)
				.on('pointerupoutside', onDragEnd)
				.on('pointermove', onDragMove);

			function onDragStart(event){
				
				this.data = event.data;
				
				let position = this.data.getLocalPosition(this);
				this.pivot.set(position.x, position.y)
				this.position.set(this.data.global.x, this.data.global.y)
				this.dragging = true;
			}	

			function onDragEnd(){
				this.dragging=false;
				this.data = null;

			}

			function onDragMove(){
				if (this.dragging){
					let newPosition = this.data.getLocalPosition(this.parent);
					this.x = newPosition.x;
					this.y = newPosition.y;
				}
			}
			return map;
		}

		makeInfoWindow(){
			let infoWindow = new PIXI.Container();
			let box = new PIXI.Graphics();
			infoWindow.addChild(box);
			return infoWindow;
		}

		makeTextBox(message){
			let textBox = this.infoWindow.children[0];
			textBox.removeChildren();
			textBox.clear();
			textBox.lineStyle(3, 0x397be5, 1);
			
			let size = message.getBounds();
			textBox.beginFill(0xFFFFFF);
			textBox.drawRoundedRect(0, 0, size.width+10, size.height+20, 15);
			textBox.endFill();

			message.position.set(10, 5)
			textBox.addChild(message);
			return textBox;
		}

		resolveEvents(){
			for (let event of this.events){
				event.resolve()
			}
		}

		update(){
			this.turns++;
			this.grid.home.update();
			this.grid.update();
			this.resolveEvents();
			console.log(this.turns)

		}

		setStage(){
			this.grid.rows.forEach((a,j)=>{
				a.forEach((b,k)=>{
					b.makeUI();
					this.map.addChild(b.ui);
				})
			})
			this.stage.addChildAt(this.map, 0);
		}
	
	}

})


	
