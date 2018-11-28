const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Usuario=require('../models/usuario');
const app=express();

app.post('/login',(req, res)=>{
    let body=req.body;
    Usuario.findOne({email: body.email.toLowerCase()},(err, usuarioDB)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                error: err
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                mensaje:'Usuario* y/o contraseña incorrecto'
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                mensaje:'Usuario y/o contraseña* incorrecto'
            });
        }
        usuarioDB.password=':)';
        let token=jwt.sign({usuario: usuarioDB}, process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});
        res.json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        })

    })
})

module.exports=app;