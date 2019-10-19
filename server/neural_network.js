

const NeuralNetwork = require('./lib/snn');

let design = [2, 4, 3, 2];
let brain = new NeuralNetwork(design);


// Say we are trying to build a network that will predict the largest of two numbers. ( a rather simple example )  
for (let i = 0; i < 10000; i++) {
    let num1 = Math.random();
    let num2 = Math.random();
    // although random() generates numbers between 0 - 1, the network will be capable to compute for any numbers
    brain.train([num1, num2], (num1 > num2 ? [1, 0] : [0, 1]));

    //i.e brain.train(Inputs, Targets);
}


largest = brain.predict([10, 20]);
console.log(`Probability Score for Largest: ${largest}`)



function importLogs(path){
    
}