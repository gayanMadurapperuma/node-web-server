const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

//Implementing middleware function
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        if (err)
            console.log('Unable to append file server.log');
    });
    next();
});

//  have some problem with this middleware function
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
//     next();
// });

//HANDLEBAR FUNCTION 
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('functionWithArgument',(text) => {
    // console.log(text);
    // var ts = text;
    return text.toUpperCase();
})

app.get('/',(req,res) => {
    //res.send('Hello Express');
    // res.send({
    //     name : 'gayan',
    //     likes : [
    //         'pakaya','hutta'
    //     ]
    // })
    res.render('home.hbs',{
       pageT : 'Home',
       pageTitle : 'Home page',
       welcomeMessage : 'Welcome home',
       currentYear : new Date().getFullYear() 
    })
});

//Routing Test
app.get('/about',(req,res) => {
    //res.render('about.hbs');
    // res.send('This is fucking about page!');
    res.render('about.hbs',{
        pageTitle : 'fucking page',
        currentYear : new Date().getFullYear()
    });
});

app.get('/heroku',(req,res) => {
    res.render('heroku.hbs');
})

app.listen(port,() => {
    console.log(`server start in port ${port}`);
});