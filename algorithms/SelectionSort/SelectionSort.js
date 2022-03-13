const array = [20,12,45,22,2];

let min = array[0];
let minIndex = undefined;
let temp = undefined;


for(let i = 1; i < array.length; i++){
    for(let j = i; j < array.length; j++){
        if(array[j] < min){
            min = array[j];
            minIndex = j;
        }
    }
    array[minIndex] = array[i];
    array[i] = min;
}

console.log(array);