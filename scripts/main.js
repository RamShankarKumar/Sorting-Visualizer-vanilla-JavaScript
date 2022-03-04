"use strict";
import {Bar} from './Bar.js';
import {BubbleSort} from '../algorithms/BubbleSort.js';

(function(){
    const barContainer = document.querySelector(".bar-container");
    const barButton = document.querySelector("#submit");
    const barInput = document.querySelector('.bar-number')
    let barContainerHeight = null;
    let barContainerWidth = null;
    let barCount = null;

    const getContainerSize = () => {
        barContainerHeight = barContainer.clientHeight;
        barContainerWidth = barContainer.clientWidth;
    }

    const generateBarOnInput = () => {
        barCount = parseInt(barInput.value);
        // console.log('Bar Count        -> ', barCount)
        getContainerSize();
        
        const visualize = new Bar();
        const bars = visualize.getBarsOnInput(barContainerHeight, barContainerWidth, barCount);
        // console.log('bars -> ', bars);
        visualize.createBars(bars, barContainer);

        const bubbleSort = new BubbleSort(barContainer);
        bubbleSort.sortBars(1000);
    }

    const generateBarOnResize = () => {
        getContainerSize();
        const visualize = new Bar();
        visualize.resizeBarsOnWindowResize(barContainerWidth, barCount);
    }

    barButton.addEventListener("click", generateBarOnInput)
    window.addEventListener('resize', generateBarOnResize)
}())