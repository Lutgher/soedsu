const express=require('express');
const bcrypt=require('bcryptjs');
const app=express();
let Usuario=require('../models/usuario');
const {verificaToken}=require('../middlewares/autenticacion');

app.get('/usuario', (req, res)=>{
    let desde=req.query.desde ||0;
    desde=Number(desde);
    let limite=req.query.limite||5;
    limite=Number(limite);
    Usuario.find({estado: true},'nombre email img role estado')
        .skip(desde)
        .limit(limite)
        .exec((err,usuario)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error de cargar usuario',
                    error: err
                });
            }
            Usuario.count({estado: true},(err,conteo)=>{
                if(err){
                    return res.status(401).json({
                        ok: false,
                        error: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuario: usuario,
                    total: conteo
                });
            });
        });
})
//buscar usuario
app.get('/coleccion/usuarios/:busqueda',(req, res)=>{
    let busqueda=req.params.busqueda;
    let regex=new RegExp(busqueda,'i');
    let promesa;
    promesa=buscarUsuario(busqueda,regex);

    promesa.then(data=>{
        res.status(200).json({
            ok: true,
            usuario: data
        });
    });
})


app.put('/usuario/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let body=req.body;
    Usuario.findById(id,(err, usuario)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje:'Error al buscar el usuario',
                error: err
            });
        }
        if(!usuario){
            return res.status(401).json({
                ok: false,
                mensaje: 'El usuario no éxiste',
                error: err
            });
        }

        usuario.nombre=body.nombre;
        usuario.email=body.email;
        //usuario.password=body.password;
        usuario.estado=true;
        usuario.role=body.role;

        usuario.save((err, usuarioSave)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error de actualizar el usuario',
                    error: err
                });
            }
            usuarioSave.password=':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioSave
            });
        });
    });
})

app.post('/usuario',(req, res)=>{
    let body=req.body;
    let usuario=new Usuario({
        nombre: body.nombre.toUpperCase(),
        email: body.email.toLowerCase(),
        password: bcrypt.hashSync(body.password,10),
        //img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioSave)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el usuario',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioSave
        });
    });
})

app.delete('/usuario/:id',[verificaToken],(req, res)=>{
    let id=req.params.id;
    let cambioEstado={
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambioEstado,{new: true},(err, usuarioSave)=>{
        if(err){
            res.status(400).json({
                ok:true,
                error: err
            })
        }

        if(!usuarioSave){
            res.status(400).json({
                ok:true,
                error: {
                    message:'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok:true,
            usuario:usuarioSave
        });
    })
})


function buscarUsuario(busqueda, regex){
    return new Promise((resolve, reject)=>{
        Usuario.find({estado: true},'nombre email')
        .or([ { 'nombre': regex },{ 'email': regex }])
        .exec((err, usuarios)=>{
            if(err){
                reject('error al cargar usuarios',err)
            }else{
                resolve(usuarios);
            }
        });
    });
}

module.exports=app;