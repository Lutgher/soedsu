const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let Asignatura=require('../models/asignatura');
const app=express();

app.get('/asignatura',(req, res)=>{
    Asignatura.find()
    .populate('periodo')
    .populate('estado')
    .populate('asignatura')
    .populate('tipoAsignatura')
        .exec((err,asignatura)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de cargar la lista de asignaturas',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                asignatura: asignatura
            });
        });
})

app.post('/asignatura',[verificaToken],(req, res)=>{
    let body=req.body;
    let asignatura=new Asignatura({
        codigo:body.codigo,
        descripcion:body.descripcion,
        estado:body.estado,
        periodo:body.periodo,
        tipo:body.tipo,
        horasTeoria:body.horasTeoria,
        horasLaboratorio:body.horasLaboratorio,
        creditos:body.creditos,
        usuario:req.usuario._id
    });

    asignatura.save((err,asignaturaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'No se puede crear la asignatura',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            asignatura: asignaturaSave
        });
    });
})

app.put('/asignatura/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Asignatura.findById(id,(err, asignatura)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al actualizar',
                error: err
            });
        }
        if(!asignatura){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe la asignatura',
                error: err
            });
        }
        asignatura.descripcion=body.descripcion;
        asignatura.estado=body.estado;
        asignatura.periodo=body.periodo;
        asignatura.tipo=body.tipo;
        asignatura.horasTeoria=body.horasTeoria;
        asignatura.horasLaboratorio=body.horasLaboratorio;
        asignatura.creditos=body.creditos;
        asignatura.fecha=Date.now();
        asignatura.usuario=req.usuario._id;
        asignatura.save((err,asigSave)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'NO se puede actualizar'
                });
            }
            res.status(200).json({
                ok: true,
                asignatura: asigSave
            });
        });
    });
})

module.exports=app;