const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const db = require('./models')
const exphbs = require('express-handlebars');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
let age;
const moment = require('moment');
let now = moment();
require('dotenv').config();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 
app.use(favicon('static/images/favicon.ico'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/static'));

//TODO: add user authentication

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
        //TODO: create USER instance from api data, as long as username is correct
        // console.log(data.data);
        age = moment(data.data.created_at);
        age = Math.floor(now.diff(age,'months')/4) +1 ;
        console.log(age);
        res.redirect(`/signup/${req.body.username}`)
    })
})

app.get('/signup/:username',(req,res)=>{
    axios.get(`https://api.github.com/users/${req.params.username}/repos`,{
        headers: {
            Authorization: 'Bearer ' + process.env.GITHUB_API_TOKEN
          }
    }).then(repoData=>{
        // console.log(repoData.data[0].owner)
        let randomNineRepos = [];
        let repoDataCopy = repoData.data.slice();
        for (let i = 0; i < 9; i++) {
            let randomIndex = Math.floor(Math.random()* repoDataCopy.length);
            let randomRepo = repoDataCopy[randomIndex];
            let repoAge = moment(randomRepo.created_at);
            let repoLang;
            if(randomRepo.language){
                repoLang = randomRepo.language.toLowerCase();
            }
            if(repoLang==='javascript'||repoLang==='css'||repoLang==='typescript' ||repoLang ==='html'){
                randomRepo.unitClass = 'Front End' 
            }
            else if(repoLang === 'ruby'||repoLang==='python'||repoLang==='php'){
                randomRepo.unitClass = 'Server Side';
            }
            else if(repoLang==='c#'||repoLang==='c'||repoLang==='c++'||repoLang==='java'){
                randomRepo.unitClass= 'Old School'
            }
            else {
                let classes = ['Front End', 'Server Side', 'Old School'];
                randomRepo.unitClass = classes[Math.floor(Math.random() * 3)];
            }
            repoAge = Math.floor(now.diff(repoAge,'months')/4) +1 ;
            randomRepo.parsedAge = repoAge;
            randomNineRepos.push(randomRepo);
            repoDataCopy.splice(randomIndex,1);
        }
        res.render('unitSelect',{units: randomNineRepos,age:age||5})
    })
})

app.post('/signup/:username',(req,res)=>{
    //TODO: create UNITS attached to authenticated user
    res.json(req.body);
})

app.listen(PORT);

