const express=require('express');
const { verificaToken }=require('../middlewares/autenticacion');
const app=express();
const FechaVencPen=require('../models/fechaVencPen');

app.get('/fechaVencimiento',(req, res)=>{
    FechaVencPen.find({})
        .populate('periodo')
        .populate('tipo')
        .populate('fechaVen')
        .exec((err, fechaVencPen)=>{
            if(err){
                return res.status(500).json({
                            ok: false,
                            mensaje:'Error de carga información',
                            error: err
                        })
            }
            res.status(200).json({
                ok: true,
                fechaVencPen: fechaVencPen
            });
        });
})

app.post('/fechaVencimiento',[verificaToken],(req, res)=>{
    let body=req.body;
    let fechaVencimiento=new FechaVencPen({
        tipo:body.tipo,
        periodo:body.periodo,
        cuota:body.cuota,
        fechaVenc:body.fechaVenc,
        usuario:req.usuario._id
    });
    console.log(fechaVencimiento);
    fechaVencimiento.save((err, fechaVencSave)=>{
        if(err){
            return res.status(500).json({
                ok: true,
                mensaje: 'Error de registro',
                error: err
            });
        };
        res.status(200).json({
            ok: true,
            fechaVencPen: fechaVencSave
        });
    });
})
app.put('/fechaVencimiento/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    FechaVencPen.findById(id,(err, fechaVencPens)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de actualización',
                error: err
            });
        };
        if(!fechaVencPens){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe el id'
            });
        }
        fechaVencPens.tipo=body.tipo;
        fechaVencPens.periodo=body.periodo;
        fechaVencPens.cuota=body.cuota;
        fechaVencPens.fechaVenc=body.fechaVenc;
        fechaVencPens.usuario=req.usuario._id;
        fechaVencPens.save((err, fechaVencPensSave)=>{
            if(err){
                return res.status(401).json({
                    ok: false,
                    mensaje:'Error al actualizar la información',
                    error: err
                });
            };
            res.status(200).json({
                ok: true,
                fechaVencPen: fechaVencPensSave,
                mensaje:'Se actualizo correctamente'
            });
        });
    });
})

module.exports=app;