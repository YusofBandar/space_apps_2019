const express = require('express')
const fs = require('fs')

const app = express()

const port = 3000
const logName =  "log.json"

app.post('/log', (req, res) => {
    let alpha = req.query.alpha;
    let beta = req.query.beta;
    let gamma = req.query.gamma;

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



