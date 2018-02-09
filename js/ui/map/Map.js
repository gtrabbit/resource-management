define([], function(){

    return function map(width, height, squareSize){
        const map = new PIXI.Container();
        map.interactive = true;
        map.x = width * (squareSize / 2) + 20;
        map.y = height * (squareSize / 2) + 20;
        map.pivot.set(width * (squareSize / 2) + 20, height * (squareSize / 2) + 20)
        map
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        function onDragStart(event) {
            this.data = event.data;
            let position = this.data.getLocalPosition(this);
            this.pivot.set(position.x, position.y)
            this.position.set(this.data.global.x, this.data.global.y)
            this.dragging = true;
        }

        function onDragEnd() {
            this.dragging = false;
            this.data = null;
        }

        function onDragMove() {
            if (this.dragging) {
                let newPosition = this.data.getLocalPosition(this.parent);
                let xBound = newPosition.x - this.pivot.x;
                let yBound = newPosition.y - this.pivot.y;
                if (xBound < 100 && xBound > -600 && yBound < 100 && yBound > -600) {
                    this.x = newPosition.x;
                    this.y = newPosition.y;
                }
            }
        }
        return map;
    }
    

})