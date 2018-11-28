const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
const app=express();
let Carrera=require('../models/carrera');


app.get('/carrera',(req,res)=>{
    Carrera.find({})
        .populate('carrera')
        .populate('periodo')
        .exec((err, carrera)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga de datos',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                carrera: carrera
            });
        });
})

app.post('/carrera',[verificaToken],(req, res)=>{
    let body=req.body;
    let carrera=new Carrera({
        tipo: body.tipoCarrera,
        codigo:body.codigo.toUpperCase(),
        descripcion:body.descripcion.toUpperCase(),
        periodo:body.periodo,
        usuario:req.usuario._id
    });

    carrera.save((err, carreraSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'No se puede crear la carrera profesional  '
            });
        }
        res.status(200).json({
            ok: true,
            carrera: carreraSave
        });
    });
})

app.put('/carrera/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Carrera.findById(id,(err,carrera)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al actualizar',
                error: err
            });
        }
        if(!carrera){
            return res.status(401).json({
                ok: false,
                mensaje: 'No existe la carrera',
                error: err
            });
        }
        carrera.tipo = body.tipo;
        carrera.descripcion = body.descripcion;
        carrera.periodo = body.periodo;
        carrera.fecha = Date.now();
        carrera.usuario = req.usuario._id;

        carrera.save((err, carrSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No existe la carrera*'
                });
            }
            res.status(200).json({
                ok: true,
                carrera: carrSave
            });
        });
    });
})

module.exports=app;