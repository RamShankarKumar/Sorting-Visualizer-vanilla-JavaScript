"use strict";
import {Bar} from './Bar.js';
import {BubbleSort} from '../algorithms/BubbleSort.js';

(function(){
    const barContainer = document.querySelector(".bar-container");
    const slider = document.querySelector('.slider');
    let sliderValue = slider.value;
    // const barButton = document.querySelector("#submit");
    // const barInput = document.querySelector('.bar-number')
    let barContainerHeight = null;
    let barContainerWidth = null;
    let barCount = null;

    const getContainerSize = () => {
        barContainerHeight = barContainer.clientHeight;
        barContainerWidth = barContainer.clientWidth;
    }

    const generateBarOnInput = () => {
        // barCount = parseInt(barInput.value);
        barCount = parseInt(slider.value)
        // console.log('Bar Count        -> ', barCount)
        getContainerSize();
        
        const visualize = new Bar();
        const [bars,randomBarHeight] = visualize.getBarsOnInput(barContainerHeight, barContainerWidth, barCount);
        // console.log('bars -> ', bars);
        visualize.createBars(bars, randomBarHeight, barContainer);

        const bubbleSort = new BubbleSort(barContainer);
        // bubbleSort.sortBars(10);
    }

    const generateBarOnResize = () => {
        getContainerSize();
        const visualize = new Bar();
        visualize.resizeBarsOnWindowResize(barContainerWidth, barCount);
    }

    generateBarOnInput();
    slider.addEventListener('change', generateBarOnInput);
    // barButton.addEventListener("click", generateBarOnInput)
    window.addEventListener('resize', generateBarOnResize)
}())