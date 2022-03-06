export class BubbleSort{
    constructor(barContainer){
        this.bars = document.querySelectorAll('.bar');
        this.barContainer = barContainer;
    }
    pause(delay) {
        return new Promise(resolve => setTimeout(resolve, delay))
    }

    resetBarStyle(leftBar, rightBar){
        leftBar.style.transform = '';
        leftBar.classList.remove('move-transition');

        rightBar.style.transform = '';
        rightBar.classList.remove('move-transition');
    }

    changeBarColor(bar, color){
        bar.classList.add('color-transition');
        bar.style.backgroundColor = color;
        // we could have removed the 'color-transition' class at this point also but this is so fast that transition does not appear to our eyes.
    }

    swapAnimation(leftBar, rightBar, delay){
        // finding left bottom corner axis.
        let leftBarStyle = {
            x: null
        }
        let rightBarStyle = {
            x : null,
        }
        leftBar.classList.remove('color-transition');
        rightBar.classList.remove('color-transition');

        leftBarStyle.x = leftBar.getBoundingClientRect().left - rightBar.getBoundingClientRect().left;
        rightBarStyle.x = rightBar.getBoundingClientRect().left - leftBar.getBoundingClientRect().left;

        leftBar.classList.add('move-transition');
        rightBar.classList.add('move-transition');

        leftBar.style.transform = `translate(${rightBarStyle.x}px)`;
        rightBar.style.transform = `translate(${leftBarStyle.x}px)`;
        return new Promise((resolve) => {
            setTimeout(() => {
                // console.log('this insdie settimeout ->> ',this) // 'this' value is undefined but in arrow function, it will search for 'this' context in its lexical scope till it finds one.

                this.barContainer.insertBefore(rightBar, leftBar);
                this.resetBarStyle(leftBar, rightBar);
                resolve();
            }, delay);
        });
    }

    async sortBars(delay){
        await this.pause(1000);
        for(let i = 0; i <= this.bars.length - 1; i++){
            for(let j = 0; j < this.bars.length - i - 1; j++){
                this.changeBarColor(this.bars[j], 'pink');
                this.changeBarColor(this.bars[j+1], 'pink');
                await this.pause(5); 
                const leftBarHeight = parseInt(this.bars[j].clientHeight);
                const rightBarHeight = parseInt(this.bars[j+1].clientHeight);
                // To compare value of two blocks
                if (leftBarHeight > rightBarHeight) {
                    await this.swapAnimation(this.bars[j], this.bars[j+1], delay);
                    this.bars = document.querySelectorAll('.bar'); // this line is a big catch.
                    // console.log('refreshed bar ->   ',this.bars)
                }
                this.changeBarColor(this.bars[j], 'green');
                this.changeBarColor(this.bars[j+1], 'green');
                await this.pause(5); 
            }
            this.changeBarColor(this.bars[this.bars.length - i - 1], 'tomato');
            await this.pause(5);
        }
    }
}