const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let ambienteSchema=new Schema({
    codigo: {type: String, required: true},
    descripcion:{type: String, required: true},
    sede:{type: Schema.Types.ObjectId,ref:'Sede', required:true},
    capacidad:{type: Number, required: true},
    tipoAmbiente:{type: String, required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('Ambiente',ambienteSchema);
