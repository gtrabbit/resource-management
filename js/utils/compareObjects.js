define([], function(){
    return function(a, b){
        let results = {};
        for (let key in b){
            results[key] = b[key] - a[key];
        }
        return results;
    }
})