const jwt=require('jsonwebtoken');

/*Verificar Toekn */
let verificaToken=(req,res, next)=>{

    //let token=req.get('token');
    let token=req.query.token;
    jwt.verify(token, process.env.SEED,(err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok: false,
                error:'Token no válido'
            });
        }
        req.usuario=decoded.usuario;
        next();
    })
}

module.exports={verificaToken};