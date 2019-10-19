

const NeuralNetwork = require('./lib/snn');
const fs = require('fs')


// up [1,0,0,0]
// down [0]

class Model {
    constructor() {
        this.design = [3, 15, 15, 10, 4, 8, 4];
        this.brain = new NeuralNetwork(this.design);

        this.up = [1, 0, 0, 0];
        this.down = [0, 1, 0, 0];
        this.right = [0, 0, 1, 0];
        this.left = [0, 0, 0, 1];
    }

    Train() {
        let promises = [];
        promises.push(this.trainNetworkLogs("./logs/tilt_up_log.json", this.up, this.brain));
        promises.push(this.trainNetworkLogs("./logs/tilt_down_log.json", this.down, this.brain));
        promises.push(this.trainNetworkLogs("./logs/tilt_right_log.json", this.right, this.brain));
        promises.push(this.trainNetworkLogs("./logs/tilt_left_log.json", this.left, this.brain));

        return Promise.all(promises)
    }

    Predict(data) {
        return this.brain.predict(data);
    }



    trainNetworkLogs(path, result, brain) {
        return new Promise((resolve, reject) => {
            this.importLogs(path).then((data) => {
                data.forEach(log => {
                    brain.train(log, result);
                    resolve();
                });
            }).catch((err) => {
                console.log(err);
                reject();
            })
        })

    }

    importLogs(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
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



let model = new Model();
model.Train().then((data) => {
    console.log(model.Predict([100,200,-50]));
});





