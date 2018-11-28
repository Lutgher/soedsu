const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let comprobanteSchema=new Schema({
    nroComprobante:{type: String, required: true},
    nroSerie:{type: String, required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    fechaRegistro:{type: Date, required: true, default: Date.now()},
    fechaActividad:{type: Date, required: true, default: Date.now()},
    estudiante:{type: Schema.Types.ObjectId, ref:'Estudiante', required: true},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});

module.exports=mongoose.model('Comprobante',comprobanteSchema);