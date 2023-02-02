import express from 'express'
import {readFileSync, writeFileSync, appendFileSync } from 'fs';
const app = express();

app.use(express.static('.'));
app.use(express.json());



app.post('/api/registration', (req, res) => {
    let text = readFileSync('test.txt', 'utf8')
    let match = text.match(req.body.email)
    if(match != null || req.body.password < 8 || req.body.age < 18) {
        res.sendStatus(500)
    } else {
        appendFileSync('test.txt', JSON.stringify(req.body) + '\n');
        res.sendStatus(201)
    }
    
});


app.post('/statistics', (req, res) => {
    appendFileSync('statistics.txt', JSON.stringify(req.body) + '\n')
    res.sendStatus(201)
});

app.listen(3000, () => {
    console.log('Server work');
});









// app.get('/', function (req, res) {
//     console.log(req);
//     res.send('<h1>Hello, world</h1>');
// });

// app.get('/name/:name', function (req, res) {
//    let name = req.params.name;
//    res.send(); 
// });

// app.get('/search', function (req, res) {
//     res.redirect('https://www.google.com'); 
//  });

// app.get('/search/:games', function (req, res) {
//     let url = req.params.games;
//     res.redirect('https://www.google.com/search?q=' + url); 
//     console.log(url);
//  });








// writeFileSync('test.txt', ' Вчора я їв пельмені, \n Сьогодні я їв пельмені, \n Завтра я буду їсти пельмені');


// let word = 'пельмені';

// let str = readFileSync('test.txt', 'utf8');
// let reg = new RegExp(word, 'g');
// let res = str.match(reg);
// let arr = res.length;
// console.log(res);
// console.log(arr);



// // console.log(text);





