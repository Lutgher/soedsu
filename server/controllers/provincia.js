const express=require('express');
const {verificaToken}=require('../middlewares/autenticacion');
const app=express();
let Provincia=require('../models/provincia');

app.get('/provincia',(req, res, next)=>{
    let desde=req.query.desde||0;
    desde=Number(desde);
    let limite=req.query.limite||10;
    limite=Number(limite);
    Provincia.find({})
        .skip(desde)
        .limit(limite)
        .populate('departamento','descripcion')
        .populate('provincia','descripcion fecha')
        .exec((err, provincia)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Error al cargar las provincias',
                    error: err
                });
            }
            Provincia.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    provincia: provincia,
                    total: conteo
                });
            });
        });
})

/*obtener provincia por id */
app.get('/provincia/prov/:id',(req, res)=>{
    let id=req.params.id;
    Provincia.findById(id)
        .populate('provincia','descripcion')
        .populate('departamento')
        .exec((err, provincia)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Error al buscar la provincia',
                    error: err
                });
            }
            if(!provincia){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No existe la provincia',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                provincia: provincia
            });
        })
})

app.get('/provincia/:dpto',(req, res)=>{
    let dpto=req.params.dpto;
    Provincia.find({departamento: dpto})
        .populate('departamento','descripcion')
        .populate('usuario','nombre email')
        .exec((err, provincias)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    mensaje:'Error de carga de provincias',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                 provincia: provincias
            });
        });
})

app.post('/provincia',[verificaToken],(req, res)=>{
    let body=req.body;
    let provincia=new Provincia({
        // codigo: body.codigo,
        descripcion: body.descripcion.toUpperCase(),
        departamento: body.departamento,
        usuario: req.usuario._id
    });
    provincia.save((err, provinciaSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear la provincia',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            provincia: provinciaSave
        });
    });
})

app.put('/provincia/:id',(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Provincia.findById(id,(err, provincia)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al actualizar la provincia'
            });
        }
        if(!provincia){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe la provincia',
                error: err
            });
        }
        provincia.descripcion=body.descripcion.toUpperCase();
        provincia.fecha=Date.now();
        provincia.departamento=body.departamento;
        provincia.usuario=req.usuario._id;
        provincia.save((err, provSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No existe la provincia',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                provincia: provSave
            });
        });
    });
})
app.delete('/provincia/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    Provincia.findByIdAndRemove(id,(err, provRemove)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al eliminar',
                error: err
            })
        }
        if(!provRemove){
            return res.status(401).json({
                ok: false,
                mensaje:'No existe la provincia',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            provincia: provRemove
        });
    });
})

app.get('/coleccion/provincia/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa=buscarProv(busqueda, regex);
    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            provincia: data
        });
    });
})

// function buscarProv(busqueda, regex){
//     return new Promise((resolve, reject)=>{
//         Provincia.find({ descripcion: regex },(err, provin)=>{
//             if(err){
//                 reject('error al listar departamentos',err);
//             }else{
//                 resolve(provin);
//             }
//         });
//     });
// }


function buscarProv(busqueda, regex){
    return new Promise((resolve, reject)=>{
        Provincia.find({ descripcion: regex })
        .populate('provincia')
        .populate('departamento')
        .exec((err, provin)=>{
            if(err){
                reject('error al listar departamentos',err);
            }else{
                resolve(provin);
            }
        });
    });
}

module.exports=app;