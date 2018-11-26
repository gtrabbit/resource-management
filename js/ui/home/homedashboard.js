define(['utils/toCamelCase'], function(toCamelCase){
    return function(){
    
        const style = new PIXI.TextStyle({
            stroke: 'white',
            align: 'center',
            fill: 'white',
            fontSize: '9pt',
            padding: 3,
        })

        const container = new PIXI.Container();
        const populationLabels = ['Commoners', 'Farmers', 'Artisans', 'Woodsmen'];
        const resourceLabels = ['Food', 'Wood', 'Silver', 'Iron'];
        const militaryLabels = ['militiaAvailable', 'militia', 'militaryCapacity'];
        const populationTotalLabels = ['citizenTotal', 'citizenCapacity'];

        // {
        //     container: [
        //         {'label-wraper': ['label-value', 'label-title']}
        //     ]
        // }
        
        let offset = -10;
        const militaryHeading = new PIXI.Text("Military", style);
        container.addChild(militaryHeading);
        militaryHeading.position.set(25, 5);
        militaryLabels.map(a =>makeDashboardItem(a, false, style))
        .forEach((a, i, arr)=>{
            offset += 25;
            container.addChild(a);
            a.position.set(offset, 5);
            if (i + 1 <+ arr.length) {
                let seperator = new PIXI.Text("/", style);
                container.addChild(seperator);
                seperator.position.set(offset + 15, 25);
            }
        });
        populationLabels.map(a=>(makeDashboardItem(a, true, style)))
            .forEach((a)=>{
                offset += 70;
                container.addChild(a);
                a.position.set(offset, 5);
            });

        const totalsHeading = new PIXI.Text("Total", style);
        container.addChild(totalsHeading);
        offset += 50;
        totalsHeading.position.set(offset + 30, 5);
        populationTotalLabels.map(a =>makeDashboardItem(a, false, style))
            .forEach((a, i)=>{
                offset += 25;
                container.addChild(a);
                a.position.set(offset, 5);
                if (i) {
                    let seperator = new PIXI.Text("/", style);
                    seperator.position.set(offset - 10, 25);
                    container.addChild(seperator);
                }
            });
        resourceLabels.map(a=>(makeDashboardItem(a, true, style)))
            .forEach((a, i)=>{
                offset += 60
                container.addChild(a);
                a.position.set(offset, 5);
            });


        const backing = new PIXI.Graphics();        
        let size = container.getBounds(); //probably not necessary-- can just get static dimensions (eventually)
        backing.beginFill(0x000312);
        backing.drawRect(0,0, size.width + 20, size.height+10);
        backing.endFill();
        container.addChildAt(backing, 0);
        container.name = 'homeDashboard';

        return {
            container,
            updateItem: update(container)
        }


        function makeDashboardItem(label, includeTitle, style) {
            const internalLabel = toCamelCase(label);            
            const itemWrapper = new PIXI.Container();
            itemWrapper.name = internalLabel + "-wrapper";
            if (includeTitle) {
                const itemTitle =  new PIXI.Text(label, style);
                itemTitle.name = internalLabel + "-title";     
                itemTitle.position.set(-15, 0);
                itemWrapper.addChild(itemTitle);
            }            
            const itemCurrent = new PIXI.Text('0', style);
            itemCurrent.name = internalLabel + "-value";
            itemCurrent.position.set(0, 20);
            itemWrapper.addChild(itemCurrent);
            return itemWrapper;            
        }


        function getItemDisplayValueObject(itemName, container) {
            const label = getDashboardlabel(itemName);
            return container.getChildByName(label + "-wrapper").getChildByName(label + "-value");
        }
       
        function getDashboardlabel(itemName) {            
            switch(itemName) {
                default: return itemName;
            }
        }

        function update(container) {
            return function setItemDisplayValue(itemName, newValue) {
                const item = getItemDisplayValueObject(itemName, container);
                if (item) {
                    item.text = newValue;
                    return true;
                }
                return false;            
            }
        }



    }
    
})