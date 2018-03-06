define([], function(){
    return function makeTextBox(infoWindow, message) {
        let textBox = infoWindow.children[0];
        textBox.removeChildren();
        textBox.clear();
        textBox.lineStyle(3, 0x397be5, 1);
        let size = message.getBounds();
        textBox.beginFill(0xFFFFFF);
        textBox.drawRoundedRect(0, 0, size.width + 10, size.height + 20, 15);
        textBox.endFill();
        message.position.set(10, 5)
        textBox.addChild(message);
        textBox.on('click', function(e){
            e.stopPropogation();
        })
        return textBox;
    }
})