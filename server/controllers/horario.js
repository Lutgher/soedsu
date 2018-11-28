const express=require('express');
const app=express();
let Horario=require('../models/horario');
let {verificaToken}=require('../middlewares/autenticacion');

app.get('/horario',(req, res)=>{
    Horario.find({})
        .exec((err,horario)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar los horarios',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                horario: horario
            })
        })
})

app.post('/horario',[verificaToken],(req, res)=>{
    let body=req.body;
    let horario=new Horario({
        codigo:body.codigo,
        descripcion:body.descripcion,
        horaInicio:body.horaInicio,
        horaFin:body.horaFin,
        usuario:req.usuario._id
    });
    horario.save((err, horarioSave)=>{
        if(err){
            return res.status(401).json({
                ok: false,
                mensaje: 'Error al crear el registro',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            horario: horarioSave
        });
    });
})

module.exports=app;
