const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/partials');

app.set('view engine', 'hbs');
app.use(
    (req, res, next)=> {
    var now = new Date().toString();
    var log = `${now} :  ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log + '\n');
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('method',()=> {
    return 'check method';
});
app.get('/',(req,res)=> {
    res.send('hello world');
});

app.get('/json',(req,res)=>{
    res.send({
        hi:'avinash',
        intro:'this is your new node webpage........'
    });
});

app.get('/welcome',(req,res)=>{
    res.render('welcome.hbs',{
        check: 'chk',
        name:'avinash singh'
    });
});

// app.get('/help',(req,res));
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});