const express=require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let EscalaCarrera=require('../models/escalaCarrera');

app.get('/escalaCarrera',(req, res)=>{
    EscalaCarrera.find({})
        .populate('escala')
        .populate('carrera')
        .exec((err, escalaCarrera)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar la información',
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                escalaCarrera: escalaCarrera
            });
        });
})

app.post('/escalaCarrera',[verificaToken],(req, res)=>{
    let body=req.body;
    let escalaCarrera=new EscalaCarrera({
        carrera: body.carrera,
        escala: body.escala,
        monto: body.monto,
        usuario: req.usuario._id
    })
    escalaCarrera.save((err, escalaCarreraSave)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error de registrar información',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            escalaCarrera: escalaCarrera
        });
    });
})

module.exports=app;