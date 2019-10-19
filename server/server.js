const express = require('express')
const app = express()
const port = 3000

app.post('/log', (req, res) => {
    let alpha = req.query.alpha;
    let beta = req.query.beta;
    let gamma = req.query.gamma;
    
    res.sendStatus(200)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))