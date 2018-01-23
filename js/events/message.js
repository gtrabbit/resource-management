define([], function(){
    return class Message{
        constructor(title, contents){
            this.title = title;
            this.contents = contents;
            this.type = 'message';
        }

        resolve(){
            return this
        }
    }
})