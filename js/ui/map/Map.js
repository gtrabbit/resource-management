define([], function(){

    return function map(width, height, squareSize, screenWidth, screenHeight){
        const map = new PIXI.Container();
        map.interactive = true;
        map.x = width * (squareSize / 2) + 20;
        map.y = height * (squareSize / 2) + 20;
        const lowerRightX = (width * squareSize / 2);
        const lowerRightY = (height * squareSize / 2);

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
                //TODO: recalculate these limits for the new diagonal layout
                /*if (xBound < 100 && xBound > -(lowerRightX + 200)) */this.x = newPosition.x;
                /*if (yBound < 100 && yBound > -(lowerRightY + 200))*/ this.y = newPosition.y;
            }
        }

        map.zoomToLocation = function(coords){
            this.pivot.set((coords[0] * squareSize) * 1.6, 1.6 * (coords[1] * squareSize));
        }

        return map;
    }
    

})