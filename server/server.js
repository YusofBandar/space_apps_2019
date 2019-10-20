const express = require('express')
const fs = require('fs')

const app = express()

const port = 3000
const logName = "./logs/tilt_right_log.json"

const Model = require("./neural_network");


let model = new Model();
model.Train().then((data) => {
    console.log("done");
});


app.post('/log', (req, res) => {

    let alpha = Math.round(req.query.alpha);
    let beta = Math.round(req.query.beta);
    let gamma = Math.round(req.query.gamma);


    console.log(`{alpha":${alpha},beta:${beta},gamma:${gamma}}`);

    fs.readFile(logName, "utf8",(err, data) =>{
         if (err){
             console.log(err);
         } else {
         let jsonData = JSON.parse(data);
         jsonData.push({
             alpha,
             beta,
              gamma
         })
     
         fs.writeFile(logName, JSON.stringify(jsonData), "utf8",()=> console.log("written"));
     }});

   



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



