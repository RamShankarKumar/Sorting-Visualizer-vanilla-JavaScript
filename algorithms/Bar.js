export class Bar{
    getRandomBarHeight(barCount, minheight, maxheight){
        let randomHeight = ((Math.random() * (maxheight - minheight)) + minheight).toFixed(2);
        // console.log('random height -> ', randomHeight);
        return randomHeight;
    }

    getBarsOnInput(barContainerHeight, barContainerWidth, barCount){
        let BarHeightPercentage = 0.85 * barContainerHeight; // 85 percent of barcontainer height
        let BarWidthPercentage = 0.5 * barContainerWidth; // 50% of barcontainer width
        let barWidth = BarWidthPercentage / barCount;
        let barContainerLeftSpaceWidth = barContainerWidth - BarWidthPercentage; // remaining space 
        let barMargin = barContainerLeftSpaceWidth / (barCount+1); // margin value of each bar to give gap between bars.

        // console.log('barwidth -> ', barWidth);
        // console.log('barMargin -> ',barMargin)
        // console.log('BarWidthPercentage -> ',BarWidthPercentage);
        // console.log('barContainerLeftSpaceWidth -> ',barContainerLeftSpaceWidth);
        // console.log('count+1 -> ',barCount+1)

        const bars = [];
        const randomBarHeigth = [];
        for(let i = 0; i < barCount;){
            let barHeight = this.getRandomBarHeight(barCount, 10, BarHeightPercentage);
            if(!randomBarHeigth.includes(barHeight)){
                randomBarHeigth.push(barHeight);
                let div = document.createElement("div");
                div.style.width = `${barWidth}px`;
                div.style.height = `${barHeight}px`;
                div.style.marginLeft = `${barMargin}px`;
                bars.push(div);
                i++;
            }
        }
        return bars;
    }

    resizeBarsOnWindowResize(barContainerWidth, barCount){
        let BarWidthPercentage = 0.5 * barContainerWidth; // 50% of barcontainer width
        let barWidth = BarWidthPercentage / barCount;
        let barContainerLeftSpaceWidth = barContainerWidth - BarWidthPercentage; // remaining space 
        let barMargin = barContainerLeftSpaceWidth / (barCount+1); // margin value of each bar to give gap between bars.

        let bars = document.querySelectorAll('.bar')

        for(let i = 0; i < bars.length; i++){
            bars[i].style.width = `${barWidth}px`;
            bars[i].style.marginLeft = `${barMargin}px`;
        }
    }
    
    createBars(bars, barContainer){
        while (barContainer.firstChild) {
            barContainer.removeChild(barContainer.firstChild);
        }

        for (const bar of bars){
            bar.classList.add('bar');
            barContainer.appendChild(bar);
        }
    }
}