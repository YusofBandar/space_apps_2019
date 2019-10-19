

const NeuralNetwork = require('./lib/snn');
const fs = require('fs')


module.exports = class Model {
    constructor(){
        this.design = [3, 15, 15,10,4,8, 4];
        this.brain = new NeuralNetwork(design);
    }
    
    trainNetworkLogs(path,result,brain){
        this.importLogs(path).then((data)=>{
            data.forEach(log => {
                brain.train(log,result);
            });
        }).catch((err) =>{
            console.log(err);
        })
    }

    importLogs(path){
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
} 




