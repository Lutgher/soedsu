const express=require('express');
const app=express();
let Sexo=require('../models/sexo');

app.get('/sexo',(req, res)=>{
    Sexo.find({})
        .exec((err, sexo)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    mensaje:'Error de carga',
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                sexo: sexo
            });
        });
});

module.exports=app;