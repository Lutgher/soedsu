const express=require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let CarreraAsignatura=require('../models/carreraAsignatura');

app.get('/carreraAsignatura',(req, res)=>{
    CarreraAsignatura.find({})
        .populate('periodo')
        .populate('carrera')
        .populate('asignatura')
        .populate('planEstudio')
        .exec((err, carreraAsignatura)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error de cargar Información',
                    error: err
                });
            }
            CarreraAsignatura.count({},(err, conteo)=>{
                if(err){
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Error '+err
                    });
                }
                res.status(200).json({
                    ok: true,
                    carreraAsignatura: carreraAsignatura,
                    total: conteo
                });
            })
        });
})

app.post('/carreraAsignatura',[verificaToken],(req, res)=>{
    let body=req.body;
    carreraAsignatura=new CarreraAsignatura({
        periodo:body.periodo,
        carrera:body.carrera,
        asignatura:body.asignatura,
        planEstudio:body.planEstudio,
        horasTeoria:body.horasTeoria,
        horasLaboratorio:body.horasLaboratorio,
        creditos:body.creditos,
        usuario:req.usuario._id
    })
    carreraAsignatura.save((err, carAsigSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al generar el registro',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            carreraAsignatura: carAsigSave,
            mensaje:'Se genero el registro exitosamente'
        });
    })
})

app.get('/carreraAsignatura/carrera/:carrera',(req, res)=>{
    let carrera=req.params.carrera;
    CarreraAsignatura.find({carrera: carrera})
        .exec((err, asignatura)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error de Búsqueda',
                    error: err
                });
            }
            if(!asignatura){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No éxiste las asignaturas de la carrera',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                carreraAsignatura: asignatura
            });
        })
})

/*Búsqueda de Asignaturas*/

app.get('/carreraAsignatura/asignatura/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa=buscarAsignatura(busqueda, regex);
    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            asignatura: data
        }); 
    })
})
function buscarAsignatura(busqueda, regex){
    return new Promise((resolve, reject)=>{
        CarreraAsignatura.find({asignatura: regex},(err, asignatura)=>{
            if(err){
                reject('Error al buscar la asignatura', err);
            }else{
                resolve(asignatura);
            }
        });
    })
}



module.exports=app;