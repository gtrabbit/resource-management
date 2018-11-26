define(['./cloneObject'], function(cloneObject){
    return function invertSign(input){
        let invert = cloneObject(input);
        for (let key in input) {
            if (input.hasOwnProperty(key)) {
                invert[key] *= -1;
            }
        }
        return invert;
    }
})