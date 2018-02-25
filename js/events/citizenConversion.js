define(['events/Timer', 'events/message'], function(Timer, Message){


    return function(startType, targetType, modifyPopulace, amount){
        const timer = new Timer('citizen-conversion', targetType.trainingTime);

        const resolve = ()=>{
            let title, content;
            if (targetType.type === 'commoners'){
                title = 'Homecoming!';
                content = 'A former ' + startType.type + ' is welcomed home.';
            } else {
                title = 'Training Complete!';
                content = 'A former ' + startType.type + ' has completed their training and is now a ' + targetType.type; + '.';
            }

            modifyPopulace(targetType.type, amount);

            return new Message(title, [content]);
        }

        return {timer, resolve};
    }
})