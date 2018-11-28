const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
const app=express();
let PlanEstudio=require('../models/planEstudio');

app.get('/planEstudio',(req, res)=>{
    PlanEstudio.find({})
        .populate('periodo')
        .populate('planEstudio')
        .populate('estado')
        .exec((err, planEstudio)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    mensaje:'Error de carga'
                });
            }
            res.status(200).json({
                ok: true,
                planEstudio: planEstudio
            });
        });
});

app.post('/planEstudio',[verificaToken],(req, res)=>{
    let body=req.body;
    let planEstudio=new PlanEstudio({
        codigo:body.codigo.toUpperCase(),
        periodo:body.periodo,
        descripcion:body.descripcion.toUpperCase(),
        estado: body.estado,
        //fecha:{type: Date, required: true, default: Date.now()},
        usuario:req.usuario._id
    });

    planEstudio.save((err,planEstSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al crear el periodo',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            planEstudio: planEstSave
        });
    });
})

app.put('/planEstudio/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    PlanEstudio.findById(id,(err,plest)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al buscar el plan de estudios',
                error: err
            });
        }
        if(!plest){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe el plan de estudios',
                error: err
            });
        }
        plest.codigo=body.codigo;
        plest.periodo=body.periodo;
        plest.descripcion=body.descripcion;
        plest.estado=body.estado;
        plest.fecha=Date.now();
        plest.usuario=req.usuario._id;

        plest.save((err, plstSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el plan de estudios',
                    error: err
                });
            }
            if(!dptoSave){
                return res.status(401).json({
                    ok: false,
                    mensaje:'El plan de estudios no existe',
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                planEstudio: plstSave
            });
        })

    });
})

module.exports=app;