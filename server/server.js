const express = require('express')
const { createLogger, format, transports } = require('winston');
const Model = require("./neural_network");
const fs = require('fs')

const app = express()

const port = 3000
const logName = "./logs/tilt_right_log.log"



/*let model = new Model();
model.Train().then((data) => {
    console.log("done");
});*/


const deleteLevel = format((info, opts) => {
    delete info.level;
    return info;
  });


const logger = createLogger({
    format: format.combine(
        deleteLevel(),
        format.json()
      ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: logName })
    ]
  });
  
   
app.post('/log', (req, res) => {

    let alpha = Math.round(req.query.alpha);
    let beta = Math.round(req.query.beta);
    let gamma = Math.round(req.query.gamma);


    logger.info({alpha,beta,gamma});
    res.sendStatus(200)
});

app.post('/predict',(req,res) => {
    let alpha = Math.round(req.query.alpha);
    let beta = Math.round(req.query.beta);
    let gamma = Math.round(req.query.gamma);


    console.log(`{alpha":${alpha},beta:${beta},gamma:${gamma}}`);

     let result = (model.Predict([100,100,100]));
    console.log(result);
    let max = -1;
    let index = -1;
    result.forEach((r, i) => {
        if (r > max) { max = r; index = i; }
    });

    let dir = ["up","down","right","left"]
    console.log(dir[index]);

    res.sendStatus(200)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


