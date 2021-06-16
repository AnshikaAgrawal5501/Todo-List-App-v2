const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get('/', function(req, res) {

    const day = date();
    res.render('list', { kindOfDay: day, newItems: items });
});

app.post('/', function(req, res) {
    item = req.body.newItem;
    items.push(item);

    res.redirect('/');
});

app.get('/deleteItem/:id', function(req, res) {

    const ind = req.params.id;
    items.splice(ind, 1);

    res.redirect('/');
});

app.listen(process.env.PORT || port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});