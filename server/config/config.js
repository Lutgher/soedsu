/*Puerto en Devl o desarrollo */
process.env.PORT = process.env.PORT || 3000;
/*Entorno */
process.env.NODE_ENV=process.env.NODE_ENV||'dev';
/*Vencimiento del token */
process.env.CADUCIDAD_TOKEN='4h';
/*SEED De autenticación*/
process.env.SEED=process.env.SEED||'3st3-3s-3l-s33d-m@5-difici1';
/*Base datos local o Server */
let urlDB;
if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/soedsu';
}else{
    urlDB=process.env.MONGO_URI;
}
process.env.URLDB=urlDB;