class Visualizer{
    constructor(container){
        this.barContainer = document.querySelector(container);
        this.barContainerHeight = this.barContainer.clientHeight;
        this.barContainerWidth = this.barContainer.clientWidth;
        this.submit = document.getElementById('submit');
        console.log(this.barContainerHeight);
        console.log(this.barContainerWidth);
    }

    createBar(barContainerWidth, barContainerHeight, count, islowercontainer = false){
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

        if(islowercontainer){
            for (const bar of bars){
                bar.classList.add('bar', 'lowerbar');
                this.barContainer.appendChild(bar);
            }
        }
        else{
            for (const bar of bars){
                bar.classList.add('bar', 'upperbar');
                this.barContainer.appendChild(bar);
            }
        }
    }

    getWindowResizeUpdate(debounceFeatureDiv, count, isDebouncing, timeDelay = 0, islowercontainer = false){
        if(!isDebouncing && !islowercontainer){
            let noDebounceCount = 0;
            window.addEventListener("resize", function(){
                noDebounceCount++;
                debounceFeatureDiv.innerHTML = noDebounceCount;
                this.barContainerHeight = this.barContainer.clientHeight;
                this.barContainerWidth = this.barContainer.clientWidth;
                this.createBar(this.barContainerWidth, this.barContainerHeight, count) 
            }.bind(this));
        }
        else{
            let debounceresizeCount = 0;
            let timer;
            window.addEventListener("resize", function(){
                // console.log(timer)
                clearTimeout(timer);
                timer = setTimeout( () => {
                    debounceresizeCount++;
                    debounceFeatureDiv.innerHTML = debounceresizeCount;
                    this.barContainerHeight = this.barContainer.clientHeight;
                    this.barContainerWidth = this.barContainer.clientWidth;
                    this.createBar(this.barContainerWidth, this.barContainerHeight, count, islowercontainer) 
                }, timeDelay)
            }.bind(this));
        }
    }

    getInput(count, islowercontainer = false){
        if(islowercontainer){
            this.createBar(this.barContainerWidth, this.barContainerHeight, count, true);
        }
        else{
            this.createBar(this.barContainerWidth, this.barContainerHeight, count);
        }
    }  
}

function main(){
    let visual1 = new Visualizer('.bar-container1');
    let visual2 = new Visualizer('.bar-container2');

    let submit = document.getElementById('submit');
    let noDebounceDiv = document.querySelector('.nodebounce');
    let DebounceDiv = document.querySelector('.debounce');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        let input = document.querySelector('.bar-number');
        let count = parseInt(input.value);
        input.value = '';

        if(count >= 0 && count <= 100){
            visual1.getInput(count);
            visual1.getWindowResizeUpdate(noDebounceDiv, count, false);

            visual2.getInput(count, true);
            visual2.getWindowResizeUpdate(DebounceDiv, count, true, 70, true);
        }
        else{
            alert('Please input bar number from 0 to 100!')
        }
    })
}

main();