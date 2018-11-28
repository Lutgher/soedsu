const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let Distrito=require('../models/distrito');
const app=express();


app.get('/distrito',(req, res)=>{
    let desde=req.params.desde || 0;
    desde=Number(desde);
    let limite=req.params.limite || 10;
    limite=Number(limite);
    Distrito.find({})
            .skip(desde)
            .limit(limite)
            .populate('provincia','descripcion')
            .populate('distrito','descripcion fecha')
            .populate('departamento')
            .exec((err, distrito)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        mensaje:'Error al cargar los distritos',
                        error: err
                    });
                }
                Distrito.count({},(err, conteo)=>{
                    if(err){
                        return res.status(401).json({
                            ok: false,
                            error: err
                        });
                    }
                    res.status(200).json({
                        ok: true,
                        distrito: distrito,
                        total: conteo
                    });
                });
            })
})
app.get('/distrito/dist/:id',(req, res)=>{
    let id=req.param.id;
    Distrito.findById(id)
        .populate('distrito','descripcion')
        .populate('provincia')
        .populate('departamento')
        .exec((err, distrito)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Error al buscar el distrito',
                    error: err
                });
            }
            if(!distrito){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No existe el distrito',
                    error: err
                });
            }
            Distrito.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    distrito: distrito
                });
            })
        });
})

app.get('/distrito/:prov',(req, res)=>{
    let prov=req.params.prov;
    Distrito.find({provincia: prov})
        .populate('provincia','descripcion')
        .populate('usuario','nombre email img')
        .exec((err, distritos)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga de distritos',
                    error: err
                });
            }
            Distrito.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    distrito: distritos,
                    total: conteo
                });
            });
        });
})

app.post('/distrito',[verificaToken],(req, res)=>{
    // console.log(req.body);
    // console.log(req.usuario);
    let body=req.body;
    let distrito=new Distrito({
        descripcion: body.descripcion.toUpperCase(),
        departamento: body.departamento,
        provincia: body.provincia,
        usuario: req.usuario._id

    })
    console.log(distrito);
    distrito.save((err,distSave)=>{
        console.log(err);
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al crear el distrito',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            distrito: distSave
        });
    });
})

app.put('/distrito/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Distrito.findById(id,(err, dist)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'No se puede actualizar',
                error: err
            });
        }
        if(!dist){
            return res.status(401).json({
                ok:false,
                mensaje:'No existe el distrito',
                error:err
            });
        }
        dist.descripcion=body.descripcion;
        dist.fecha=Date.now();
        dist.provincia=body.provincia;
        dist.departamento=body.departamento;
        dist.usuario=req.usuario._id;

        dist.save((err, distSave)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar',
                    error: err
                });
            }
            if(!distSave){
                return res.status(401).json({
                    ok:false,
                    mensaje: 'No éxiste el distrito',
                    error: err
                }); 
            }
            res.status(200).json({
                ok: true,
                distrito: distSave
            });
        });
    })
})

app.delete('/distrito/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    Distrito.findByIdAndRemove(id,(err, distritoDelete)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al eliminar',
                error: err
            });
        }
        if(!distritoDelete){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe el distrito con el ID',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            distrito: distritoDelete
        })
    })
})

module.exports=app;