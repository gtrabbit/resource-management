define([], function(){
    return class Timer {
        constructor(type, duration){
            this.duration = duration;
            this.type = type;
        }

        modifyDuration(amount){
            this.duration = amount ? this.duration + amount : this.duration - 1;
            return this.duration;
        }

        checkDuration(){
            return this.duration;
        }
    }
})