

const NeuralNetwork = require('./lib/snn');
const fs = require('fs')

let design = [3, 4, 3, 4];
let brain = new NeuralNetwork(design);


TrainNetworkLogs(brain);

//largest = brain.predict([10, 20]);
//console.log(`Probability Score for Largest: ${largest}`)

function TrainNetworkLogs(brain) {
    importLogs("./tilt_left_log.json").then((data)=>{
        data.forEach(log => {
            brain.train(log,[1,0,0,0]);
        });
        console.log(brain.predict([60,55,21]));
    }).catch((err) =>{
        console.log(err);
    })
}
function importLogs(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path,(err,data)=>{
            let logs = [];
            if (err) {
                reject(err);
            } else {
                let json = JSON.parse(data);
                json.forEach(element => {
                    logs.push([element.alpha, element.beta, element.gamma]);
                });
                return resolve(logs);
            }
        })
    })
}