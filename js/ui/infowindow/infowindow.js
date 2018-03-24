define(['ui/infowindow/maketextbox', 'ui/infowindow/closer'], function(makeTextbox, makeCloser){

    return function makeInfoWindow(style, infowindowLayer){

        let infoWindow = new PIXI.Container();
        infoWindow.layer = infowindowLayer;

        //function called when one wants to open the infowindow
        //with a particular message (basically always, right?)
        infoWindow.openWith = function(messageContainer, selectedTile){
            infoWindow.layer.removeChild(infoWindow);
            //clear out what was there previously
            infoWindow.removeChildren();

            //create a textbox based on the size of the incoming message
            let textbox = makeTextbox(
                messageContainer.recieveStyle.call(infoWindow,
                                                 style,
                                                 infoWindow.closeInfowindow));

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
            const closer = makeCloser(infoWindow, infoWindow.closeInfowindow, style);

            textbox.addChild(closer);

            //add the infowindow to the view
            infoWindow.layer.addChild(infoWindow);

        }

//some helper stuff

        infoWindow.closeInfowindow = function(){
            infoWindow.removeChildren();
            if (infoWindow.parent){
                infoWindow.parent.removeChild(infoWindow);
            }            
        }

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