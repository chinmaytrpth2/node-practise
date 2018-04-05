const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log("Unable to save the file.");
        }
    });
    next(); 
});

// app.use((req, res, next) => {
//     res.render('mentainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    // res.send("Hello Express!");
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'About Page',
        pageMessage: 'Welcome to the Homepage.'
    });
});

app.get('/about', function(req, res){
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', function(req, res){
    res.send({
        error: 'Bad Request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`);
})
