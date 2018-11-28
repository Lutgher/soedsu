const express=require('express');
const fileUpload=require('express-fileupload');
const fs=require('fs');
const app=express();
const Usuario=require('../models/usuario');

//middleware
app.use(fileUpload());


app.put('/usuarios/:id',(req, res, next)=>{
    let id=req.params.id;
    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de cargado ',
            error:{message: 'debe re seleccionar una imagen'}
        });
    }
    let archivo=req.files.imagen;
    let nombreCorto=archivo.name.toLowerCase().split('.');
    let extensionArchivo=nombreCorto[ nombreCorto.length -1];
    //extensiones validas
    let extensionValidas=['jpg','png','gif','jpeg'];
    if( extensionValidas.indexOf(extensionArchivo)<0 ){
        return res.status(400).json({
            ok: true,
            mensaje: 'Extensión no válida',
            error: {message: `Extensiones válidas son ${ extensionValidas.join(', ')}`}
        });
    }
    //Nombre archivo personalizado
    let nombreArchivo =`${ id }-${new Date().getMilliseconds()}.${ extensionArchivo }`;
    //mover el archivo temporal a un path
    let path = `./uploads/usuarios/${ nombreArchivo }`;
    archivo.mv(path, err=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                error: err
            });
        }
        subirTipo(id, nombreArchivo, res);

    });

});


function subirTipo(id, nombreArchivo, res){

    Usuario.findById(id,(err,usuario)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al cargar la imagen',
                error: err
            });
        }
        let pathViejo=`./uploads/usuarios/${usuario.img}`;
        //si exite elimina la imagen anterior
        if(fs.existsSync(pathViejo)){
            fs.unlink(pathViejo);
        }
        usuario.img=nombreArchivo;
        usuario.save((err,usuarioActualizado)=>{
            if(err){
                return res.status(401).json({
                    error: err
                });
            }
            usuarioActualizado.password=';)';
            return res.status(200).json({
                ok: true,
                mensaje:'Imagen de usuario actualizada',
                usuario: usuarioActualizado
            });
        });

    }); 
}

module.exports=app;