define(['events/Timer'], function(Timer){
    return class Message{
        constructor(title, contents){
            this.title = title;
            this.contents = contents;
            this.type = 'message';
            this.timer = new Timer(this.type, 0);
        }

        resolve(){
            return this
        }
    }
})