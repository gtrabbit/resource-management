define([], function(){
    return function(container, closingFunction, style){
        const closer = new PIXI.Text('X', style);
        closer.interactive = true;
        closer.buttonMode = true;
        closer.on('click', () => {
            closingFunction();

        });
        const size = container.getBounds();
        closer.position.set(size.width - 25, 5);
        return closer;
    }
})