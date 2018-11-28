const express= require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let Matricula=require('../models/matricula');

app.get('/matricula/:periodo',(req, res)=>{
    Matricula.find()
        .exec((err, matricula)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error de carga de información',
                    error: err
                });
            }
        });
})

module.exports=app;