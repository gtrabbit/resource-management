define([], function(){
    return function fromCamelCase(inputString, toTitleCase){
        return inputString.split(/(?=[A-Z])/g).map(a => toTitleCase ? a[0].toUpperCase() + a.slice(1) : a.toLowerCase()).join(' ');
    }
})