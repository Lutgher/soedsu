const express=require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let Concepto=require('../models/concepto');

app.get('/concepto',(req, res)=>{
    Concepto.find({})
        .populate('estado')
        .populate('concepto')
        .exec((err,concepto)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    mensaje: 'Error al cargar la información',
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                concepto: concepto
            });
        });
})

app.post('/concepto',[verificaToken],(req, res)=>{
    let body=req.body;
    let concepto=new Concepto({
        codigo:body.codigo.toUpperCase(),
        descripcion:body.descripcion.toUpperCase(),
        obligatorio: body.obligatorio,
        estado:body.estado,
        usuario:req.usuario._id
    });

    concepto.save((err, conceptoSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'No se puede registar',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            concepto: conceptoSave
        });
    })
})

module.exports=app;