define([], function(){
    return function toCamelCase(inputString){
        return inputString.split(' ')
            .reduce((a, c, i) => (                
                i < 2 
                    ? c[0].toLowerCase() + c.slice(1)
                    : a + c[0].toUpperCase() + c.slice(1)
            ), '')
    }
})