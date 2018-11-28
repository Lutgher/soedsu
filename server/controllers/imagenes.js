const express=require('express');
const app=express();
//librerai par improtar path fuera de la carpeta
const path=require('path');
const fs=require('fs');

app.get('/img/usuarios/:img',(req, res, next)=>{

    let img=req.params.img;

    let pathImagen=path.resolve(__dirname, `../../uploads/usuarios/${ img }`);
    console.log(pathImagen);
    if(fs.existsSync(pathImagen)){
        res.sendFile( pathImagen );
    }else{
        let pathNoImagen=path.resolve(__dirname,'../assets/no-img.jpg');
        res.sendFile( pathNoImagen);
    }
});

module.exports=app;