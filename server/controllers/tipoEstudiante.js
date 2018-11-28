const express=require('express');
const app=express();
const {verificaToken}=require('../middlewares/autenticacion');
let TipoEstudiante=require('../models/tipoEstudiante');

app.get('/tipoEstudiante',(req, res)=>{
    TipoEstudiante.find({})
        .exec((err, tipoEstudiante)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar información',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                tipoEstudiante: tipoEstudiante
            });
        });
})

app.post('/tipoEstudiante',[verificaToken],(req, res)=>{
    let body=req.body;
    let tipoEstudiante=new TipoEstudiante({
        codigo:body.codigo.toUpperCase(),
        descripcion:body.descripcion.toUpperCase(),
        usuario:req.usuario._id
    });
    tipoEstudiante.save((err, tipoEstudianteSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error de registro de información',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            tipoEstudiante: tipoEstudianteSave
        });
    });
})

module.exports=app;