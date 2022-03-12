export class BubbleSort{
    constructor(barContainer){
        this.bars = document.querySelectorAll('.bar');
        this.barContainer = barContainer;

        // config button
        this.speedSliderButton = document.querySelector('.speed-range-input input')
        this.rangeSpeeds = [2000, 1500, 700, 100, 10];

        //Step button
        this.stats = 1;
        this.nextStep = true;
    }
    pause(delay) {
        return new Promise(resolve => setTimeout(resolve, delay))
    }

    pauser() {
        return new Promise(resolve => {
            // console.log('this inside executor function ->  ',this)

            let playbuttonclick = function () {
                // console.log('this inside playbuttonlcick ->  ', this)
                document.getElementById("next-step").disabled = true;
                this.nextStep = false;
                this.stats = 0;
                resolve("resolved");
            }
            
            let pausebuttonclick = function () {
                document.getElementById("next-step").disabled = false;
                this.nextStep = true;
                resolve("resolved");
            }
            let nextButtonClick = function () {
                this.stats = 0;
                this.nextStep = true;
                resolve("resolved");
            }
    
            let decidePauseAndPlay = function () {
                if(document.getElementById("play-pause").innerHTML === 'Play'){
                    document.getElementById("play-pause").innerHTML = 'Pause';
                    playbuttonclick.apply(this); // instant execution of function with new context
                }
                else{
                    document.getElementById("play-pause").innerHTML = 'Play';
                    pausebuttonclick.apply(this); // instant execution of fucntion with new context.
                }
            }
    
            document.getElementById("next-step").replaceWith(document.getElementById("next-step").cloneNode(true));
            document.getElementById("play-pause").replaceWith(document.getElementById("play-pause").cloneNode(true));
            document.getElementById("play-pause").addEventListener("click", decidePauseAndPlay.bind(this)) // new function is returned with new context by using bind method.
            document.getElementById("next-step").addEventListener("click", nextButtonClick.bind(this))
        })
    }

    resetBarStyle(leftBar, rightBar){
        // we removing all the property so that after applying insertBefore function, bars should not go to its transform position again.
        leftBar.style.removeProperty('transform');
        leftBar.style.removeProperty('transition');

        rightBar.style.removeProperty('transform');
        rightBar.style.removeProperty('transition');
    }

    changeBarColor(bar, color, delay){
        bar.style.cssText += `transition: ${delay/1000}s background-color ease;`
        bar.style.backgroundColor = color;
        // we could have removed the 'color-transition' class at this point also but this is so fast that transition does not appear to our eyes.
    }

    async swapAnimation(leftBar, rightBar, delay){
        // finding left bottom corner axis.
        let leftBarStyle = {
            x: null
        }
        let rightBarStyle = {
            x : null,
        }

        leftBarStyle.x = leftBar.getBoundingClientRect().left - rightBar.getBoundingClientRect().left;
        rightBarStyle.x = rightBar.getBoundingClientRect().left - leftBar.getBoundingClientRect().left;

        // we are adding transition value as transform , background-color and not 'all'. Because once transform applied, background color transition get overwritten. And because of just tranform transition, we are not able to see the displacement of the bars after the insertBefore function execution.
        // It still happens but it happens so fast that we can not see and because of not having transition as 'all', it happens abruptly without transition and thus in out eyes it looks all okay.
        leftBar.style.cssText += `transition: ${delay/1000}s transform ease;`
        rightBar.style.cssText += `transition: ${delay/1000}s transform ease;`

        leftBar.style.transform = `translate(${rightBarStyle.x}px)`;
        rightBar.style.transform = `translate(${leftBarStyle.x}px)`;

        return new Promise((resolve) => {
            setTimeout(() => {
                // console.log('this inside settimeout ->> ',this) // 'this' value is undefined but in arrow function, it will search for 'this' context in its lexical scope till it finds one.
                this.barContainer.insertBefore(rightBar, leftBar);
                this.resetBarStyle(leftBar, rightBar);
                resolve();
            }, delay);
        });
    }

    removeSlideUpTransition(){
        for(let i = 0; i < this.bars.length; i++){
            this.bars[i].classList.remove('slideup');
        }
    }

    async sortBars(delay){
        this.speedSliderButton.addEventListener('input', () => {
            delay = this.rangeSpeeds[this.speedSliderButton.value];
            // console.log('visualizerSpeed -> ', delay);
        })
        this.removeSlideUpTransition();
        for(let i = 0; i <= this.bars.length - 1; i++){
            for(let j = 0; j < this.bars.length - i - 1; j++){

                // wait for user input event on play pause button. These two if condition made successful for the play-pause and next step.
                if(this.nextStep === true){
                    this.stats = 1;
                }
                if (this.stats === 1){
                    await this.pauser();
                    await this.pause(300); 
                }

                // await this.pause(delay); 
                this.changeBarColor(this.bars[j], '#F2C76E', delay);
                this.changeBarColor(this.bars[j+1], '#F2C76E', delay);
                await this.pause(delay/2); 

                const leftBarHeight = parseInt(this.bars[j].clientHeight);
                const rightBarHeight = parseInt(this.bars[j+1].clientHeight);
                // To compare value of two blocks
                if (leftBarHeight > rightBarHeight) {
                    await this.swapAnimation(this.bars[j], this.bars[j+1], delay);
                    this.bars = document.querySelectorAll('.bar'); // this line is a big catch.
                    // console.log('refreshed bar ->   ',this.bars)
                }

                // await this.pause(delay);
                this.changeBarColor(this.bars[j], '#7A77B9', delay);
                this.changeBarColor(this.bars[j+1], '#7A77B9', delay);
                await this.pause(delay/2);
            }
            if(this.bars.length == 1){
                if(this.nextStep === true){
                    this.stats = 1;
                }
                if (this.stats === 1){
                    await this.pauser();
                    await this.pause(300); 
                }

            }
            this.changeBarColor(this.bars[this.bars.length - i - 1], '#EA7186');
            await this.pause(delay/2);
        }
    }
}