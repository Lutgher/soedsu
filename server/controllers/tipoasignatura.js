const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let TipoAsignatura=require('../models/tipoasignatura');
const app=express();

app.get('/tipoAsignatura',(req, res)=>{
    TipoAsignatura.find({})
        .populate('tipoAsignatura')
        .populate('estado')
        .exec((err, tipoAsignatura)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    mensaje:'Error a cargar la información',
                    error: err
                });
            }
            TipoAsignatura.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: true,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    tipoAsignatura: tipoAsignatura,
                    total: conteo
                });
            });
        });
})

app.post('/tipoAsignatura',[verificaToken],(req, res)=>{
    let body=req.body;
    
    let tipoasignatura=new TipoAsignatura({
        codigo:body.codigo.toUpperCase(),
        descripcion:body.descripcion.toUpperCase(),
        estado: body.estado,
        usuario: req.usuario._id
    });
    console.log(tipoasignatura);
    tipoasignatura.save((err, tipoAsignaturaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al insertar el registro',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            tipoAsignatura: tipoAsignaturaSave
        });
    });
})

module.exports=app;