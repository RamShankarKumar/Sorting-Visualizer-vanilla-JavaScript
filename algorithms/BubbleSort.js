export class BubbleSort{
    constructor(){
        this.bars = document.querySelectorAll('.bar');
        // console.log('bars in bubblesort constructor ->  ', this.bars);
    }

    getBarHeights(){
        let Heights = []
        for(let i = 0; i < this.bars.length; i++){
            let height = this.bars[i].clientHeight;
            Heights.push(height);
        }
        return Heights;
    }

    sortBars(){
        let barHeights = this.getBarHeights();

        for(let i = 0; i < barHeights.length - 1; i++){
            for(let j = 0; j < barHeights.length - i - 1; j++){
                this.bars[j].style.backgroundColor = 'red';
                if(barHeights[j] > barHeights[j+1]){
                    let temp = barHeights[j];
                    barHeights[j] = barHeights[j+1];
                    barHeights[j+1] = temp;
                }
                this.bars[j].style.backgroundColor = 'green';
            }
        }
    }
}