const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
const port = 3000;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connection URL
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.fudqe.mongodb.net/todolistDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add item.']
    },
});

const Item = mongoose.model('Item', itemSchema);

// const item1 = new Item({
//     name: 'Welcome to Todo App'
// });

// const item2 = new Item({
//     name: 'Type an item'
// });

// const item3 = new Item({
//     name: '<-- Hit to delete'
// });

// const items = [item1, item2, item3];

app.get('/', function(req, res) {

    const day = date();

    Item.find(function(err, foundItems) {
        console.log(foundItems)
        res.render('list', { kindOfDay: day, newItems: foundItems });
        // if (foundItems.length == 0) {
        //     Item.insertMany(items, function(err) {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log('Successfully added items')
        //             res.redirect('/');
        //         }
        //     });
        // } else {
        //     console.log(foundItems)
        //     res.render('list', { kindOfDay: day, newItems: foundItems });
        // }
    });

});

app.post('/', function(req, res) {
    newItem = req.body.newItem;

    const item = new Item({
        name: newItem
    });

    item.save(function() {
        res.redirect('/');
    });

});

app.get('/deleteItem/:id', function(req, res) {

    const id = req.params.id;
    console.log(id)
    Item.deleteOne({ _id: id }, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('deleted successfully')
        }
    })

    res.redirect('/');
});

app.listen(process.env.PORT || port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});