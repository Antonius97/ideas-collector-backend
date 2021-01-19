const config = require('./config.js');
const port = config.PORT;

const fs = require('fs');
const path = require('path');
const ideasFolder = './ideas/';

const express = require('express');
const app = express();

let currentIdeas = fs.readdirSync(ideasFolder).filter(fileName => /\.md$/.test(fileName)).length;
console.log(`Ideas currently: ${currentIdeas}`);



app.get('/ideas', (req, res) => {    
    fs.readdir(ideasFolder, (err, files) => {
        const ideasJSONNames = files.filter(fileName => /\.json$/.test(fileName));
        const ideasJSON = ideasJSONNames.map(fileName => JSON.parse(fs.readFileSync(ideasFolder + fileName)));
        res.send(ideasJSON);
    });
});

app.get('/ideaContent/:id', (req, res) => {
    let Id = req.params.id;
    res.sendFile(`${path.resolve(ideasFolder)}/${Id}.md`);
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});