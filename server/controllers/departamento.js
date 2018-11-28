const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
const app=express();
let Departamento=require('../models/departamento');



app.get('/departamento',(req, res, next)=>{
    Departamento.find({})
        .exec((err,departamentos)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error de carga los departamentos',
                    error: err
                });
            }
            Departamento.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    departamentos: departamentos,
                    total: conteo
                });
            });
        });
})

app.get('/coleccion/departamento/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa=buscarDepto(busqueda, regex);
    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            departamento: data
        });
    });
})

app.put('/departamento/:id', verificaToken,(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Departamento.findById(id,(err, dpto)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el Departamento',
                error: err
            });
        }
        if(!dpto){
            return res.status(401).json({
                ok: false,
                mensaje: 'El departamento no éxiste',
                error: err
            });
        }
        dpto.descripcion=body.descripcion.toUpperCase();
        dpto.fecha=Date.now();
        dpto.usuario=req.usuario._id;
        
        dpto.save((err, dptoSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el departamento',
                    error: err
                });
            }
            if(!dptoSave){
                return res.status(401).json({
                    ok: false,
                    mensaje:'El departamento no existe',
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                departamento: dptoSave
            });
        });
    });
})

app.post('/departamento', verificaToken,(req, res)=>{
    let body=req.body;
    let departamento=new Departamento({
        descripcion: body.descripcion.toUpperCase(),
        usuario: req.usuario._id
    });

    departamento.save((err,dptoSave)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el departamento',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            departamento: dptoSave
        });
    });
})

app.delete('/departamento/:id',[verificaToken], (req, res)=>{
    let id=req.params.id;
    Departamento.findByIdAndRemove(id,(err,dptoRemove)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Fallo la elminación',
                error: err
            });
        }
        if(!dptoRemove){
            return res.status(400).json({
                ok: false,
                mensaje:'No existe el Departamento',
                error: err
            });
         }

         res.status(200).json({
             ok: true,
             departamento: dptoRemove
         });
    });
})

function buscarDepto(busqueda, regex){
    return new Promise((resolve, reject)=>{
        Departamento.find({ descripcion: regex },(err, deptos)=>{
            if(err){
                reject('error al listar departamentos',err);
            }else{
                resolve(deptos);
            }
        });
    });
}

module.exports=app;