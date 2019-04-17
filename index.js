const express = require('express');
const app = express();
const db = require('./models')
const exphbs = require('express-handlebars');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
 require('dotenv').config();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/static'));
 
app.get('/',(req,res)=>{
     res.render('index');
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',(req,res)=>{
    axios.get(`https://api.github.com/users/${req.body.username}`,{
        headers: {
            Authorization: 'Bearer ' + process.env.GITHUB_API_TOKEN
          }
    }).then(data=>{
        console.log(data.data);
        res.redirect(`/signup/${req.body.username}`)
    })
})

app.get('/signup/:username',(req,res)=>{
    axios.get(`https://api.github.com/users/${req.params.username}/repos`,{
        headers: {
            Authorization: 'Bearer ' + process.env.GITHUB_API_TOKEN
          }
    }).then(repoData=>{
        let randomNineRepos = [];
        let repoDataCopy = repoData.data.slice();
        for (let i = 0; i < 9; i++) {
            let randomIndex = Math.floor(Math.random()* repoDataCopy.length);
            randomNineRepos.push(repoDataCopy[randomIndex]);
            repoDataCopy.splice(randomIndex,1);
        }
        res.render('unitSelect',{units: randomNineRepos})
    })
})

app.listen(PORT);

