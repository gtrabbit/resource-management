define([], () => {
    return (color, target, ticks, ticker) => {
        
        let count = 0;
        const flashOff = (delta, time) => {
            count += delta;
            if (count > time) {
                ticker.remove()
            }
        }
        
        ticker.add()
    }
})