require('./server/config/config');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
    next();
  });


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('./server/routers/index'));

mongoose.connect(process.env.URLDB,{useNewUrlParser: true})
        .then(()=>{
            console.log('Online base de datos',process.env.URLDB)
        })
        .catch(err=>{
            console.log(err);
        });

app.listen(process.env.PORT,()=>{
    console.log('Escuchando el puerto', process.env.PORT);
});