define([], function(){
    return function(obj1, obj2){
        let total = {};
        for (let key in obj1){
            if (obj1.hasOwnProperty(key)){
                total[key] = obj1[key] + (obj2[key] || 0);
            }
        }
        return total;
    }
})