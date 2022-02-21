class Visualizer{
    constructor(){
        this.barContainer = document.querySelector('.bar-container');
        this.barContainerHeight = this.barContainer.clientHeight;
        this.barContainerWidth = this.barContainer.clientWidth;
        this.submit = document.getElementById('submit');
        console.log(this.barContainerHeight);
        console.log(this.barContainerWidth);
    }

    createBar(barContainerWidth, barContainerHeight, userInput=false){
        if(userInput){
            let input = document.querySelector('.bar-number')
            this.count = parseInt(input.value); // storing this variable as object key and value. Here this context is Visualizer object which is created by javascript in case of ES6 class concept.
            input.value = '';
        } // we can not keep this if condition down as count variable will not be present in the object.
            
        let BarHeightPercentage = 0.85 * barContainerHeight; // 85 percent of barcontainer height
        let BarWidthPercentage = 0.5 * barContainerWidth; // 50% of barcontainer width
        let barWidth = BarWidthPercentage / this.count;
        let barHeight = BarHeightPercentage;
        let barContainerLeftSpaceWidth = barContainerWidth - BarWidthPercentage; // remaining space 
        let barMargin = barContainerLeftSpaceWidth / (this.count+1); // margin value of each bar to give gap between bars.
        // console.log('barwidth -> ', barWidth);
        // console.log('barHeight -> ', barHeight);
        // console.log('barMargin -> ',barMargin)
        // console.log('BarWidthPercentage -> ',BarWidthPercentage);
        // console.log('barContainerLeftSpaceWidth -> ',barContainerLeftSpaceWidth);
        // console.log('count+1 -> ',this.count+1)

        const bars = [];
        for(let i = 0; i < this.count; i++){
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

    getWindowResizeUpdate(){
        window.addEventListener("resize", function(){
            this.barContainerHeight = this.barContainer.clientHeight;
            this.barContainerWidth = this.barContainer.clientWidth;
            this.createBar(this.barContainerWidth, this.barContainerHeight) 
        }.bind(this));
    }

    getInput(){
        this.submit.addEventListener('click', function(){
            this.createBar(this.barContainerWidth, this.barContainerHeight, true);
        }.bind(this)) // .bind works here because in .bind() we get a brand new function with the context that we pass in it. But in .call() we directly call a function and we get undefined at function place because called function does not return anything and we get undefined. And undefined in not a function so eventlistener don't get executed at that point.
    }  
}

let visual = new Visualizer();
visual.getInput();
visual.getWindowResizeUpdate();