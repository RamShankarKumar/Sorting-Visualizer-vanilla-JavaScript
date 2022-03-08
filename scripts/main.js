"use strict";
import {BubbleSort} from '../algorithms/BubbleSort.js';
import {Bar} from './Bar.js';

(function(){

    //Range slider
    const speedRangeInput = document.querySelector(".speed-range-input input");
    const barRangeInput = document.querySelector(".bar-range-input input");

    // Bar container
    const barContainer = document.querySelector(".bar-container");

    //Config menu
    const shuffleButton = document.querySelector(".shuffle");
    const resetButton = document.querySelector(".reset");

    //dropdown
    const dropDownButton = document.querySelector(".algo-list");
    const dropDownMenu = document.querySelector(".dropdown-menu");





    //Drop Down button code
    dropDownButton.addEventListener('click', () => {
        dropDownMenu.classList.toggle("dropdown-menu-on");
    })
    // --------------------------------------------------



    // Bar Range Slider code
    document.querySelector('.bar-range-value').innerHTML = barRangeInput.value;
    barRangeInput.addEventListener('input', () => {
        document.querySelector('.bar-range-value').innerHTML = barRangeInput.value;
    })
    // --------------------------------------------------



    // Speed Range Slider Code
    const speeds = [2000, 1500, 700, 100, 10];
    let visualizerSpeed = speeds[speedRangeInput.value];
    speedRangeInput.addEventListener('input', () => {
        visualizerSpeed = speeds[speedRangeInput.value];
        // console.log('visualizerSpeed -> ', visualizerSpeed);
    })
    // --------------------------------------------------------------------------------------------------




    // Visualizer code
    let barContainerHeight = null;
    let barContainerWidth = null;
    let barCount = null;

    const getContainerSize = () => {
        barContainerHeight = barContainer.clientHeight;
        barContainerWidth = barContainer.clientWidth;
    }

    const generateBarOnInput = async () => {
        document.getElementById('play-pause').innerHTML = 'Play';
        // barCount = parseInt(barInput.value);
        barCount = parseInt(barRangeInput.value)
        // console.log('Bar Count        -> ', barCount)
        getContainerSize();
        
        const visualize = new Bar();
        const [bars,randomBarHeight] = visualize.getBarsOnInput(barContainerHeight, barContainerWidth, barCount);
        visualize.createBars(bars, randomBarHeight, barContainer);
        const bubbleSort = new BubbleSort(barContainer);

        // Here we are putting a promise return because with the help of long debugging session, I found that browser is keep waiting for the repaint of the created bar and as soon as it gets the promise wait, in the mean time it paints the browser. Our first promise is being called in BubbleSort.js file. So to paint the created bar as soon as possible, we put the promise return here only.
        // One more reason to put this here as, as soons as we get the bars painted, we can remove the slideup transition from all bars at once in the BubbleSort.js file. This will help us in making smooth color-transition as there will only be color transition at that point of time.
        await bubbleSort.pause(1000);

        bubbleSort.sortBars(visualizerSpeed);
    }

    const generateBarOnResize = () => {
        getContainerSize();
        const visualize = new Bar();
        visualize.resizeBarsOnWindowResize(barContainerWidth, barCount);
    }

    generateBarOnInput();
    barRangeInput.addEventListener('change', generateBarOnInput);
    window.addEventListener('resize', generateBarOnResize)
    // ----------------------------------------------------




    // Shuffle Button Code
    shuffleButton.addEventListener("click", generateBarOnInput);
    // --------------------------------------------------------------------------------------------------



    // Reset Button Code
    resetButton.addEventListener("click", () => {
        if(barRangeInput !== 30 || speedRangeInput !== 2){
            barRangeInput.value = 30;
            document.querySelector('.bar-range-value').innerHTML = '30';
            speedRangeInput.value = 2;
            visualizerSpeed = speeds[2];
            generateBarOnInput();
        }
    });
    // --------------------------------------------------------------------------------------------------

}())