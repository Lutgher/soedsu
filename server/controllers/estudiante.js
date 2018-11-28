const express=require('express');
const app=express();
let {verificaToken}=require('../middlewares/autenticacion');
let Estudiante=require('../models/estudiante');

app.get('/estudiante',(req, res)=>{
    let desde=req.query.desde || 0;
    desde=Number(desde);
    let limite=req.query.limite || 10;
    limite=Number(limite);
    Estudiante.find({})
        .populate('carrera')
        .populate('periodo')
        .populate('sede')
        .populate('estado')
        .populate('tipoEstudiante')
        .populate('estudiante')
        .skip(desde)
        .limit(limite)
        .exec((err, estudiante)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar la información',
                    error: err
                });
            }
            Estudiante.count({},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    estudiante: estudiante,
                    total:conteo
                });
            });
        });
})
//busqueda por periodo
app.get('/estudiante/periodo',(req, res)=>{
    let periodo=req.query.periodo || ' ';
    let dni=req.query.dni ||' ';
    let desde=req.query.desde || 0;
    desde=Number(desde);
    let limite=req.query.limite || 10;
    limite=Number(limite);
    Estudiante.find({},'periodo codigo')
        .or([{periodo: periodo}, {codigo: dni}])//.find({$or:[{periodo: periodo, codigo: dni}]})
        .populate('carrera')
        .populate('periodo')
        .populate('sede')
        .populate('estado')
        .populate('tipoEstudiante')
        .populate('estudiante')
        .skip(desde)
        .limit(limite)
        .sort(nombre)
        .exec((err, estudiante)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar la información',
                    error: err
                });
            }
            Estudiante.count({periodo: periodo, codigo: dni},(err, conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    estudiante: estudiante,
                    total:conteo
                });
            });
        });
})

app.get('/estudiante/:nroDocumento',(req, res)=>{
    let nroDocumento=req.params.nroDocumento;
    let periodo=req.query.periodo;
    Estudiante.find({codigo: nroDocumento})
        .exec((err,estudiante)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar la información',
                    error:err
                });
            }
            if(!estudiante){
                return res.status(401).json({
                    ok: false,
                    mensaje:'No existe el usuario con nro de documento',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                estudiante: estudiante
            });
        });
})

app.get('/estudiante/stud/:id',(req, res)=>{
    let id=req.params.id;
    Estudiante.findById(id)
        // .populate('carrera')
        // .populate('periodo')
        // .populate('sede')
        // .populate('estado')
        // .populate('tipoEstudiante')
        // .populate('estudiante')
        .exec((err, estudiante)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje:'Error al cargar la información',
                    error: err
                });
            }
            if(!estudiante){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No éxiste el estudiante con el código',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                estudiante: estudiante
            });
        });
})



app.post('/estudiante',[verificaToken],(req, res)=>{
    let body=req.body;
    let estudiante=new Estudiante({
        persona:body._id,
        codigo:body.nroDocumento.toUpperCase(),
        nombre:body.alias.toUpperCase(),
        carrera:body.carrera,
        periodo:body.periodo,
        sede:body.sede,
        estado:body.estado,
        tipoEstudiante:body.tipoEstudiante,
        usuario:req.usuario._id
    });
    
    estudiante.save((err,estudianteSave)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al registrar',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            estudiante: estudianteSave,
            mensaje:'Se registro el estudiante correctamente'
        });
    });
})

app.put('/estudiante/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Estudiante.findById(id,(err, estudiante)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error de actualizar',
                error: err
            });
        }   
        if(!estudiante){
            return res.status(400).json({
                ok: false,
                mensaje:'No existe el id del estudiante',
                error: err
            });
        }
                
        estudiante.persona=body._id,
        estudiante.codigo=body.nroDocumento.toUpperCase(),
        estudiante.nombre=body.alias.toUpperCase(),
        estudiante.carrera=body.carrera,
        estudiante.periodo=body.periodo,
        estudiante.sede=body.sede,
        estudiante.estado=body.estado,
        estudiante.tipoEstudiante=body.tipoEstudiante,
        estudiante.fecha=Date.now(),
        estudiante.usuario=req.usuario._id
        
        estudiante.save((err, estudianteSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje:'No existe el estudiante',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                estudiante: estudianteSave,
                mensaje:'Se actualizo el estudiante correctamente'
            });
        });
    });
})

app.get('/coleccion/estudiante/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa=buscarEstudiante(busqueda, regex);
    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            estudiante: data
        });
    });
})

function buscarEstudiante(busqueda, regex){
    return new Promise((resolve, reject)=>{
        Estudiante.find({ nombre: regex },(err, estudiante)=>{
            if(err){
                reject('error al listar estudiantes',err);
            }else{
                resolve(estudiante);
            }
        });
    });
}
module.exports=app;