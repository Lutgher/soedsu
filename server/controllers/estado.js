const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
const app=express();
let Estado=require('../models/estado');

app.get('/estado',(req, res)=>{
    Estado.find({})
        .exec((err, estado)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga de estados',
                    error: err
                });
            }
           
            res.status(200).json({
                ok: true,
                estado: estado
            });
        });
})

app.post('/estado',[verificaToken],(req, res)=>{
    let body=req.body;
    let estado=new Estado({
        codigo: body.codigo.toUpperCase(),
        descripcion: body.descripcion.toUpperCase(),
        usuario: req.usuario._id
    });
    estado.save((err, estadoSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al crear el estado'
            });
        }
        res.status(200).json({
            ok: true,
            estado: estadoSave
        });
    });
})

app.put('/estado/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Estado.findById(id,(err, estado)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar'
            });
        }
        if(!estado){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe el estado'
            });
        }
        estado.codigo= body.codigo.toUpperCase();
        estado.descripcion= body.descripcion.toUpperCase();
        estado.fecha=Date.now();
        estado.usuario= req.params.id;
    });
})

module.exports=app;