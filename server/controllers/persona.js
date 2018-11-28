const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let Persona=require('../models/persona');
const app=express();

app.get('/persona',(req, res)=>{
    Persona.find({})
        .populate('provincia')
        .populate('persona')
        .exec((err,persona)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al listar la información',
                    error:err
                });
            }
            Persona.count((err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    })
                }
                res.status(200).json({
                    ok: true,
                    persona: persona,
                    total:conteo
                });
            })
        })
})

app.get('/persona/dni/:dni',(req, res)=>{
    let dni=req.params.dni;
    Persona.find({nroDocumento: dni})
        .exec((err, persona)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga',
                    error: err
                });
            }
            if(!persona){
                return res.status(401).json({
                    ok: false,
                    mensaje:'NO existe la persona con Nro de Documento',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                persona:persona
            });
        })
})

app.post('/persona', [verificaToken],(req, res)=>{
    let body=req.body;
    let persona= new Persona({
            apellidoPaterno:body.apellidoPaterno.toUpperCase(),
            apellidoMaterno:body.apellidoMaterno.toUpperCase(),
            nombre:body.nombre.toUpperCase(),
            nroDocumento:body.nroDocumento,
            alias:body.apellidoPaterno.toUpperCase()+' '+body.apellidoMaterno.toUpperCase()+', '+body.nombre.toUpperCase(),
            nroTelefono:body.nroTelefono,
            celular:body.celular,
            email:body.email,
            tipoPersona:'N',
            sexo:body.sexo,
            fechaNacimiento:body.fechaNacimiento,
            distrito:body.distrito,
            provincia:body.provincia,
            departamento:body.departamento,
            direccion:body.direccion,
            distritoDireccion:body.distritoDireccion.toUpperCase(),
            provinciaDireccion:body.provinciaDireccion,
            departamentoDireccion:body.departamentoDireccion,
            fecha:body.fecha,
            usuario:req.usuario._id
        });
    console.log(persona);
    persona.save((err, personaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al registrar a la persona',
                error: err
            });
        }
        res.status(200).json({
            ok:true,
            persona: personaSave
        });
    });
})


app.post('/personaempr', [verificaToken],(req, res)=>{
    let body=req.body;
    console.log(body);
    let persona =new Persona({
            nroDocumento: body.nroDocumento,
            alias: body.alias.toUpperCase(),
            nroTelefono: body.nroTelefono,
            celular: body.celular,
            email: body.email,
            tipoPersona: 'E',
            direccion: body.direccion.toUpperCase(),
            distritoDireccion: body.distritoDireccion,
            provinciaDireccion: body.provinciaDireccion,
            departamentoDireccion: body.departamentoDireccion,
            usuario: req.usuario._id
        });
    
    persona.save((err, personaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al registrar a la persona',
                error: err
            });
        }
        res.status(200).json({
            ok:true,
            persona: personaSave
        });
    });
})

app.get('/coleccion/persona/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa=buscarPersona(busqueda, regex);
    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            persona: data
        });
    });
})

function buscarPersona(busqueda, regex){
    return new Promise((resolve, reject)=>{
        Persona.find({ alias: regex },(err, persona)=>{
            if(err){
                reject('error al listar persona',err);
            }else{
                resolve(persona);
            }
        });
    });
}


module.exports=app;