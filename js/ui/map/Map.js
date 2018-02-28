define([], function(){

    return function map(width, height, squareSize, screenWidth, screenHeight){
        const map = new PIXI.Container();
        map.interactive = true;

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
            const x = (((coords[0] * -squareSize) + (coords[1] * squareSize) + screenWidth) / 2) + this.pivot.x;
            const y = (((coords[0] / 2) * -(squareSize * 0.618)) + ((coords[1] / 2) * -(squareSize * 0.618)) / 2) + this.pivot.y;

            this.position.set(x , y);
        }

        return map;
    }
    

})