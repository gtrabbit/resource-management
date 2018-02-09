//used when updating resources/population totals
//ignores the militia available property

define([], function(){
    return function(a, b){
        let results = {};
        for (let key in b){
            if (key !== 'militiaAvailable') results[key] = b[key] - a[key];
        }
        return results;
    }
})