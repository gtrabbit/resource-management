define(['events/Timer', 'events/message'], function(Timer, Message){


    return function(startType, targetType, callback){
        const timer = new Timer('citizen-conversion', startType.trainingTime);

        const resolve = ()=>{
            if (targetType.type === 'commoner'){
                let title = 'Homecoming!';
                let content = 'A former ' + startType.type + ' is welcomed home.';
            } else {
                let title = 'Training Complete!';
                let content = 'A former ' + startType.type + ' has completed their training and is now a ' + targetType.type; + '.';
            }

            callback(targetType.type, 1);

            return new Message(title, [content]);
        }

        return {timer, resolve};
    }
})