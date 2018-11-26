define(['./farm', './house', './market', './tower', './cabin'], function(Farm, House, Market, Tower, Cabin){
    const classList = [Farm, House, Market, Tower, Cabin];
    
    return {
        typeNames: classList.map(a => new a().type),
        classes: classList.reduce((acc, type) => {
            let classInstance = new type();
            acc[classInstance.type] = type;
            return acc;
        }, {})
    }
})