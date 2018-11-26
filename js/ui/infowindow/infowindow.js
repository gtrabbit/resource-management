define(['ui/infowindow/maketextbox', 'ui/infowindow/closer'], function(makeTextbox, makeCloser){

    return function makeInfoWindow(style, infowindowLayer, ticker){

        let infoWindow = new PIXI.Container();
        infoWindow.layer = infowindowLayer;
        infoWindow.isOpen = false;
        infoWindow.activeTile = null;
        
        infoWindow.close = function(){
            infoWindow.isOpen = false;
            infoWindow.removeChildren();
            if (infoWindow.parent){
                infoWindow.parent.removeChild(infoWindow);
            }            
        }
        infoWindow.registerLabel = function(label) {
            infoWindow.labels.push(label);
        }

        const waitThenClearWithCallback = function(time, current, callback) {
            return function(delta) {
                current+= delta;
                if (current > time) {
                    callback();
                    console.log(this);
                    ticker.remove(this);
                }
            }
        }

        const paintItBlack = (label) => {
            label.children.forEach(a => {a.style.fill = 'black'});
        }

        infoWindow.warn = function(labelName) {
            let label = this.labels.find(a => a.name === labelName + "-wrapper");
            label.children.forEach((a, i) => { if ( i > 0) a.style.fill = 'red'});
            window.setTimeout(function() {
                paintItBlack(label);
            }, 300);
        }
        //function called when one wants to open the infowindow
        //with a particular message (basically always, right?)
        infoWindow.openWith = function(messageContainer, selectedTile){
            infoWindow.activeTile = selectedTile;
            infoWindow.isOpen = true;
            infoWindow.layer.removeChild(infoWindow);
            //clear out what was there previously
            infoWindow.removeChildren();

            //create a textbox based on the size of the incoming message
            let textbox = makeTextbox(
                messageContainer.recieveStyle.call(infoWindow,
                                                 style));

            //add the textbox to the infowindow
            infoWindow.addChild(textbox);

            //If the infowindow is generated with an associated tile,
            //add functions to highlight that tile and remove highlighting
            //when the infowindow is removed
            if (selectedTile){
                setListeners(selectedTile, messageContainer.onDismiss);
               

            //place the infowindow in relation to the incoming tile
                infoWindow.position.set(
                    selectedTile.ui.parent.x + selectedTile.squareSize + 10,
                    selectedTile.ui.parent.y);
            } else {
                infoWindow.position.set(
                    //would need somehow to calculate the middle of the screen
                    //if we're not building in relation to a specific tile...
                )
            }
            
            //Make the closer (little x in corner)
            const closer = makeCloser(infoWindow, infoWindow.close, style);

            textbox.addChild(closer);

            //add the infowindow to the view
            infoWindow.layer.addChild(infoWindow);

        }

//some helper stuff

        function setListeners(selectedTile, dismissal){
            infoWindow.on('added', highlightSelectedTile.bind(selectedTile));
            infoWindow.on('removed', unhighlightSelectedTile.bind(selectedTile));
            infoWindow.on('removed', dismissal.bind(selectedTile));
        }

        function highlightSelectedTile(){
            this.ui.previousTint = this.ui.tint || 0xDDDDDD;
            this.ui.tint = 0xFF99BB;
        }

        function unhighlightSelectedTile(){
            this.ui.tint = this.ui.previousTint || 0xDDDDDD;
            infoWindow.removeAllListeners();
        }

        return infoWindow;
    }
})