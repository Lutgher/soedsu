const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let detallComprobanteSchema=new Schema({
    comprobante:{type: Schema.Types.ObjectId, ref:'Comprobante', required: true},
    ctaCorriente:{type: Schema.Types.ObjectId, ref:'CtaCorriente',required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    fechaActividad:{type: Date, required: true, default: Date.now()},
    monto:{type: Number, required: true, default: 0},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('DetalleComprobante',detallComprobanteSchema);