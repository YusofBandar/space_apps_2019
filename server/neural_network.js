

const NeuralNetwork = require('./lib/snn');
const fs = require('fs')

module.exports = class Model {
    constructor() {
        this.design = [3,50,50,4];
        this.brain = new NeuralNetwork(this.design);

        this.up = [1, 0, 0, 0];
        this.down = [0, 1, 0, 0];
        this.right = [0, 0, 1, 0];
        this.left = [0, 0, 0, 1];
    }

    Train() {
        let promises = [];
        promises.push(this.importLogs("./logs/tilt_down_log.log", this.down));
        promises.push(this.importLogs("./logs/tilt_up_log.log", this.up));
        //promises.push(this.importLogs("./logs/tilt_left_log.log", this.left));

        return Promise.all(promises).then((data) => {
            let trainingSet = [];

            data.forEach(d => {
                trainingSet = trainingSet.concat(d);
            });

            trainingSet = this.shuffle(trainingSet);


            trainingSet.forEach(d => {
                this.brain.train(d.input,d.output);
            });
        })
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

    importLogs(path,output) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                let logs = [];
                if (err) {
                    reject(err);
                } else {
                    var buf = data.toString('utf8');
                    buf = buf.split("\r\n");
                    buf.forEach(element => {
                        try {
                            let json = JSON.parse(element);
                            json = json.message;
                            logs.push({input:[json.alpha, json.beta, json.gamma],output:output});
                        } catch (error) {

                        }

                    });
                    return resolve(logs);
                }
            })
        })
    }


    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}




