const express = require('express');
const app = express();
const db = require('./models')
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/static'));
 
app.get('/',(req,res)=>{
     res.render('index');
})

app.listen(PORT);