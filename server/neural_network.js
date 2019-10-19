

const NeuralNetwork = require('./lib/snn');
const fs = require('fs')


// up [1,0,0,0]
// down [0]

module.exports = class Model {

    up = [1,0,0,0];
    down = [0,1,0,0];
    right = [0,0,1,0];
    left = [0,0,0,1];

    constructor(){
        this.design = [3, 15, 15,10,4,8, 4];
        this.brain = new NeuralNetwork(design);
    }

    Init(){
        trainNetworkLogs("./logs/tilt_up_log.json",this.up,this.brain);
        trainNetworkLogs("./logs/tilt_down_log.json",this.down,this.brain);
        trainNetworkLogs("./logs/tilt_right_log.json",this.right,this.brain);
        trainNetworkLogs("./logs/tilt_left_log.json",this.left,this.brain);
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




