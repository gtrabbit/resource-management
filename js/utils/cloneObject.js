//is a shallow clone, obviously
define([], function(){
    return function(a){
        const clone = {};
        for (let key in a){
            clone[key] = a[key];
        }
        return clone;
    }
})