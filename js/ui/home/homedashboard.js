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

        function makeDashboardItem(label, style, includeTotal){
            const itemWrapper = new PIXI.Container();
            const internalLabel = toCamelCase(label);
            itemWrapper.name = internalLabel;

            const displayLabel = internalLabel === 'militiaAvailable' ? '(' + label.split(' ')[1].toLowerCase() + ')' : label;
            const itemLabel = new PIXI.Text(displayLabel + ':', style);
            
            const itemCurrent = new PIXI.Text('0', style);
            itemCurrent.name = internalLabel + '_current';
            itemLabel.position.set(0, 0);
            itemCurrent.position.set(0, 20);

            if (includeTotal && internalLabel !== 'militiaAvailable'){
                const divider = new PIXI.Text('/', style);
                const itemTotal = new PIXI.Text('0', style);
                itemTotal.name = internalLabel + '_total';
                divider.position.set(20, 20);
                itemTotal.position.set(30, 20);
                itemWrapper.addChild(itemLabel, itemCurrent, divider, itemTotal);
            } else {
                itemWrapper.addChild(itemLabel, itemCurrent);
            }
            return itemWrapper;
        }

        function updateItem(item, isTotal, newValue){
            const name = item + '_' + (isTotal ? 'total' : 'current');
            this.container.getChildByName(item).getChildByName(name).text = newValue;
        }

        const populationLabels = [
            'Commoners',
            'Farmers', 'Artisans', 'Woodsmen',
            'Militia', 'Militia Available',
            'Total'];
        const resourceLabels = ['Food', 'Wood', 'Silver'];
        let offset = -60;
        populationLabels.map(a=>(makeDashboardItem(a, style, true)))
            .forEach((a)=>{
                offset += 80;
                container.addChild(a);
                a.position.set(offset, 5);
            });

        resourceLabels.map(a=>(makeDashboardItem(a, style, false)))
            .forEach((a, i)=>{
                container.addChild(a);
                a.position.set(offset + 130 + (i * 50), 5);
            });


        const backing = new PIXI.Graphics();        
        let size = container.getBounds(); //probably not necessary-- can just get static dimensions (eventually)
        backing.beginFill(0x000000);
        backing.drawRect(0,0, size.width + 20, size.height+10);
        backing.endFill();
        container.addChildAt(backing, 0);
        container.name = 'homeDashboard';

        return {
            container,
            updateItem
        }
    }
    
})