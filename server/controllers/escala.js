const express=require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let Escala=require('../models/escala');

app.get('/escala',(req, res)=>{
    Escala.find({})
        .populate('estado')
        .populate('escala')
        .exec((err, escala)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar la información',
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                escala: escala
            });

        });
});

app.post('/escala',[verificaToken],(req,res)=>{
    let body=req.body;
    let escala=new Escala({
        codigo:body.codigo.toUpperCase(),
        descripcion:body.descripcion.toUpperCase(),
        estado:body.estado,
        usuario:req.usuario._id
    });

    escala.save((err, escalaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear el registro',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            escala: escalaSave
        });
    });

})

module.exports=app;