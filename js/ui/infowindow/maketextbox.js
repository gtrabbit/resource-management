define([], function(){
    return function makeTextBox(message) {
        let textBox = new PIXI.Graphics();
        textBox.lineStyle(3, 0x397be5, 1);
        let size = message.getBounds();
        textBox.beginFill(0xFFFFFF);
        textBox.drawRoundedRect(0, 0, size.width + 10, size.height + 20, 15);
        textBox.endFill();
        message.position.set(10, 5);
        textBox.interactive = true;
        textBox.on('click', stopClickEvents);

        function stopClickEvents(event) {
            event.stopPropagation();
            event.reset();
        }
        textBox.addChild(message);
        return textBox;
    }
})