

const NeuralNetwork = require('./lib/snn');
const fs = require('fs')

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



importLogs("./log.json",(err,data) =>{
    let logs = [];
    if (err){
        console.log(err);
    } else {
        let json = JSON.parse(data);
        json.forEach(element => {
            logs.push([element.alpha,element.beta,element.gamma]);
        });
        console.log(logs);
    }
})

function importLogs(path,callback){
    fs.readFile(path, "utf8",callback);
}