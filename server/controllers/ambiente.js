const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let Ambiente=require('../models/ambiente');
const app=express();

app.get('/ambiente',(req, res)=>{
    let desde=req.query.desde || 0;
    desde=Number(desde);
    let limite=req.query.limite || 10;
    limite=Number(limite);
    Ambiente.find()
        .populate('Sede')
        .populate('Ambiente')
        .exec((err, ambiente)=>{
            if(err){
                return res.status(500).json({
                    ok: true,
                    mensaje:'Error al cargar información',
                    error: err
                });
            }
            Ambiente.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    ambiente:ambiente,
                    total: conteo
                });
            });
        })
})

app.post('/ambiente',[verificaToken],(req, res)=>{
    let body=req.body;
    let ambiente=new Ambiente({
        codigo: body.codigo.toUpperCase(),
        descripcion:body.descripcion.toUpperCase(),
        sede:body.sede,
        capacidad:body.capacidad,
        tipoAmbiente:body.tipoAmbiente.toUpperCase(),
        usuario:req.usuario._id
    });
    ambiente.save((err, ambienteSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al registrar',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            ambiente: ambienteSave
        });
    })
})

app.get('/ambiente/amb/:id',(req, res)=>{
    let id=req.params.id;
    Ambiente.findById(id)
        .populate('sede')
        .populate('ambiente')
        .exec((err, ambiente)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de busqueda',
                    error:err
                });
            }
            if(!ambiente){
                return res.status(401).json({
                    ok: false,
                    mensaje:'No existe el ambiente con el código',
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                ambiente: ambiente
            })
        })
})


module.exports=app;