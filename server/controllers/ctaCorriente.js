const express=require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let CtaCorriente=require('../models/ctaCorriente');
let Concepto=require('../models/concepto');

app.get('/ctaCorriente',(req, res)=>{
    CtaCorriente.find()
        .populate('escala')
        .populate('estudiante')
        .populate('concepto')
        .exec((err, ctaCorriente)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Erron de carga de información',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                ctaCorriente: ctaCorriente
            });
        });
})

app.post('/ctaCorriente',[verificaToken],(req, res, next)=>{
    let body=req.body;
    
    let ctaCorriente=new CtaCorriente({
        estudiante:body.estudiante,
        escala:body.escala,
        periodo:body.periodo,
        concepto:body.concepto,
        monto:body.monto,
        abono:body.abono,
        deuda:body.monto,
        dscto:body.dscto,
        fechaVenc:body.fechaVenc,
        interes:body.interes,
        usuario:req.usuario._id
    });
    

    ctaCorriente.save((err, ctaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error de crear el registro',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            ctaCorriente: ctaSave
        });
    })
})

app.put('/ctaCorriente/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    
})

function conceptos(){
    
}

module.exports=app;