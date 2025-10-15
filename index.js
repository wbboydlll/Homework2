const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

//load public folder statically
server.use(express.static('public'));

function updateHitCounter(){
    const filePath = 'hits.txt';
    let hits = 0
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf8');
        hits = parseInt(data);
    }
    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;
}
//api end point for getting number of hits someone visited
server.get('/hits', function (req, res){
    const hits = updateHitCounter();
    res.json({hits: hits});
});

function getRandomWord() {
    const filePath = 'allwords.txt';
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        const randomLine = lines [Math.floor(Math.random() * lines.length)];
        const [word, part, defn] = randomLine.split('\t');
        return {word:word, part:part, definition:defn};
    }
}

server.get('/wordRequest', (req, res)=>{
    const wordInfo = getRandomWord();
    res.json(wordInfo);
});


server.listen(port, function () {
    console.log(`Listening at 
        http://localhost:${port}`);
});







server.get('/hello', function (req, res){
    res.send('Hello, World!');
});

