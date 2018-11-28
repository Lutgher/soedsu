const express=require('express');
const app=express();
let Rol=require('../models/rol');
const {verificaToken}=require('../middlewares/autenticacion');

app.get('/rol',(req, res)=>{
    Rol.find({})
        .exec((err,role)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga de roles',
                    error: err
                });
            }
            res.status(200).json({
                ok:true,
                rol: role
            });
        });
})

app.post('/rol',[verificaToken],(req, res)=>{
    let body=req.body;
    let rol=new Rol({
        nombre:body.nombre,
        descripcion:body.descripcion,
        usuario: req.usuario._id
    });

    rol.save((err, rolSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error de carga',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            rol: rolSave
        });
    });
})

app.put('/rol/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
});
module.exports=app;