const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
let Periodo=require('../models/periodo');
const app=express();

app.get('/periodo',(req, res)=>{
    Periodo.find()
        .sort('nombre')
        // .reverse()
        .exec((err, periodo)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de carga de periodos',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                periodo:periodo
            });
        });
})
app.get('/periodo/:id',(req, res)=>{
    let id=req.params.id;
    Periodo.findById(id)
    .exec((err, periodo)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error de carga de periodo',
                error: err
            }); 
        }
        if(!err){
            return res.status(400).json({
                ok: false,
                mensaje:'No existe el periodo',
                error: err
            }); 
        }
        res.status(200).json({
            ok: true,
            periodo: periodo
        });
    });
})
app.get('/periodo/nombre/:nombre',(req, res)=>{
    let nombre=req.params.nombre;
    Periodo.find({nombre: nombre})
        .exec((err, periodo)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al buscar el periodo',
                    error: err
                });
            }
            if(!periodo){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe el periodo',
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                periodo: periodo
            })
        })
})
app.get('/coleccion/periodo/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa=buscarPeriodo(busqueda, regex);
    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            periodo: data
        });
    });
})

app.post('/periodo',[verificaToken],(req, res)=>{
    let body=req.body;
    let periodo=new Periodo({
        nombre:body.nombre,
        fechaInicio:body.fechaInicio,
        fechaFin:body.fechaFin,
        usuario:req.usuario._id
    });
    periodo.save((err, perSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'No se puede crear el periodo',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            periodo: perSave
        });
    });
})

app.put('/periodo/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Periodo.findById(id,(err, perio)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'No se puede actualizar',
                error:err
            });
        }
        perio.nombre=body.nombre;
        perio.fechaInicio=body.fechaInicio;
        perio.fechaFin=body.fechaFin;
        perio.fecha=Date.now();
        perio.usuario=req.usuario._id;
        perio.save((err, perSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No se puede actualizar',
                    error: err
                });
            }
            if(!perSave){
                return res.status(401).json({
                    ok: false,
                    mensaje:'Error, no se puede actualizar',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                periodo: perSave
            });
        });
    })
})

function buscarPeriodo(busqueda, regex){
    return new Promise((resolve, reject)=>{
        Periodo.find({ nombre: regex },(err, periodos)=>{
            if(err){
                reject('error al listar periodos',err);
            }else{
                resolve(periodos);
            }
        });
    });
}

module.exports=app;