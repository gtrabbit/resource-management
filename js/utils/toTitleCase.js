define([], function(){
    return function toTitleCase(inputString){
        return inputString
            .split(' ')
            .map(str => str[0].toUpperCase() + str.slice(1))
            .join(' ');
    }
})