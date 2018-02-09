define([], function(){
    return function(events, welcome){
        const box = document.getElementById('event-results-box');
        const container = document.getElementById('event-results-container');
        container.close = () => {
            container.style.display = 'none';
        }
        box.currentlyDisplayedChild = -1;
        box.changeDisplayChild = function (dir) {
            if (this.currentlyDisplayedChild > -1) {
                this.children[this.currentlyDisplayedChild].style.display = 'none';
            }

            this.currentlyDisplayedChild += dir;
            this.children[this.currentlyDisplayedChild].style.display = 'block';
            document.getElementById('day-counter').innerText = `Day ${this.currentlyDisplayedChild + 1}`
            return this.currentlyDisplayedChild;
        }

        const close = document.getElementById('close');
        close.addEventListener('click', () => {
            container.close();
        })

        const next = document.getElementById('next');
        next.setAttribute('disabled', true);
        const back = document.getElementById('back');
        back.setAttribute('disabled', true);

        next.addEventListener('click', () => {
            box.changeDisplayChild(1);
            back.removeAttribute('disabled');
            if (box.children.length === box.currentlyDisplayedChild + 1) {
                next.setAttribute('disabled', true);
            }
        })

        back.addEventListener('click', () => {
            box.changeDisplayChild(-1);
            next.removeAttribute('disabled');
            if (box.currentlyDisplayedChild === 0) {
                back.setAttribute('disabled', true);
            }

        })
        events.push(welcome);
        return container;
    }
})