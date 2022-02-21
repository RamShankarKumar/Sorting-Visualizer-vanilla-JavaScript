class Visualizer{
    constructor(container){
        this.barContainer = document.querySelector(container);
        this.barContainerHeight = this.barContainer.clientHeight;
        this.barContainerWidth = this.barContainer.clientWidth;
        this.submit = document.getElementById('submit');
        console.log(this.barContainerHeight);
        console.log(this.barContainerWidth);
    }

    createBar(barContainerWidth, barContainerHeight, count){
        let BarHeightPercentage = 0.85 * barContainerHeight; // 85 percent of barcontainer height
        let BarWidthPercentage = 0.5 * barContainerWidth; // 50% of barcontainer width
        let barWidth = BarWidthPercentage / count;
        let barHeight = BarHeightPercentage;
        let barContainerLeftSpaceWidth = barContainerWidth - BarWidthPercentage; // remaining space 
        let barMargin = barContainerLeftSpaceWidth / (count+1); // margin value of each bar to give gap between bars.
        // console.log('barwidth -> ', barWidth);
        // console.log('barHeight -> ', barHeight);
        // console.log('barMargin -> ',barMargin)
        // console.log('BarWidthPercentage -> ',BarWidthPercentage);
        // console.log('barContainerLeftSpaceWidth -> ',barContainerLeftSpaceWidth);
        // console.log('count+1 -> ',this.count+1)

        const bars = [];
        for(let i = 0; i < count; i++){
            let div = document.createElement("div");
            div.style.width = `${barWidth}px`;
            div.style.height = `${barHeight}px`;
            div.style.marginLeft = `${barMargin}px`;
            bars.push(div);
        }

        while (this.barContainer.firstChild) {
            this.barContainer.removeChild(this.barContainer.firstChild);
        }

        for (const bar of bars){
            bar.classList.add('bar');
            this.barContainer.appendChild(bar);
        }
    }

    getWindowResizeUpdate(throttleFeatureDiv, count, isThrottling, timeDelay = 0){
        if(!isThrottling){
            let noThrottleresizeCount = 0;
            window.addEventListener("resize", function(){
                noThrottleresizeCount++;
                throttleFeatureDiv.innerHTML = noThrottleresizeCount;
                this.barContainerHeight = this.barContainer.clientHeight;
                this.barContainerWidth = this.barContainer.clientWidth;
                this.createBar(this.barContainerWidth, this.barContainerHeight, count) 
            }.bind(this));
        }
        else{
            let throttleresizeCount = 0;
            let timer;
            window.addEventListener("resize", function(){
                clearTimeout(timer);
                timer = setTimeout( () => {
                    throttleresizeCount++;
                    throttleFeatureDiv.innerHTML = throttleresizeCount;
                    this.barContainerHeight = this.barContainer.clientHeight;
                    this.barContainerWidth = this.barContainer.clientWidth;
                    this.createBar(this.barContainerWidth, this.barContainerHeight, count) 
                }, timeDelay)
            }.bind(this));
        }
    }

    getInput(count){
        this.createBar(this.barContainerWidth, this.barContainerHeight, count, true);
    }  
}

function main(){
    let visual1 = new Visualizer('.bar-container1');
    let visual2 = new Visualizer('.bar-container2');

    let submit = document.getElementById('submit');
    let nothrottleDiv = document.querySelector('.nothrottle');
    let throttleDiv = document.querySelector('.throttle');
    submit.addEventListener('click', () => {
        let input = document.querySelector('.bar-number');
        let count = parseInt(input.value);
        input.value = '';

        console.log('count -> ',count)

        visual1.getInput(count);
        visual1.getWindowResizeUpdate(nothrottleDiv, count, false);

        visual2.getInput(count);
        visual2.getWindowResizeUpdate(throttleDiv, count, true, 1000);
    })
}

main();