const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let Sede=require('../models/sede');
const app=express();

app.get('/sede',(req, res)=>{
    Sede.find({})
        .exec((err, sede)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error no se puede cargar la sede'
                });
            }
            res.status(200).json({
                ok:true,
                sede: sede
            });
        });
})

app.post('/sede', [verificaToken],(req, res)=>{
    let body=req.body;
    let sede=new Sede({
        codigo: body.codigo.toUpperCase(),
        descripcion: body.descripcion.toUpperCase(),
        direccion: body.direccion.toUpperCase(),
        distrito: body.distrito,
        usuario: req.usuario._id
    });
    sede.save((err, sedeSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear la sede',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            sede: sedeSave
        });
    });
})

app.put('/sede/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Sede.findById(id,(err, sede)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al actualizar',
                error: err
            });
        }
        if(!sede){
            return res.status(401).json({
                ok:true,
                mensaje:'No existe la sede',
                error: err
            });
        }
        
        sede.codigo= body.codigo.toUpperCase();
        sede.periodo= body.periodo;
        sede.descripcion= body.descripcion.toUpperCase();
        sede.direccion= body.direccion.toUpperCase();
        sede.distrito= body.distrito;
        sede.fecha=Date.now();
        sede.usuario= req.usuario._id;
    });
})

module.exports=app;