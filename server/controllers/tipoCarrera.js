const express=require('express');
const { verificaToken }=require('../middlewares/autenticacion');
const app=express();
let TipoCarrera=require('../models/tipoCarrera')

app.get('/tipoCarrera',(req, res)=>{
    TipoCarrera.find({})
        .exec((err, tipoCarrera)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga de información',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                tipoCarrera: tipoCarrera            
            })
        }); 
})

app.post('/tipoCarrera',[verificaToken],(req, res)=>{
    let body=req.body;
    let tipoCarrera=new TipoCarrera({
        nombre:body.nombre,
        usuario:req.usuario._id
    });
    tipoCarrera.save((err, tipoCarreraSave)=>{
        if(err){
            return res.status(401).json({
                ok: false,
                mensaje:'Error de registro',
                error: err
            });
        };
        res.status(200).json({
            ok: true,
            tipoCarrera: tipoCarreraSave
        });
    });
});

module.exports=app;