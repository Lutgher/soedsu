const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let ctaCorrienteSchema=new Schema({
    estudiante:{type: Schema.Types.ObjectId, ref:'Estudiante', required: true},
    escala:{type: Schema.Types.ObjectId, ref:'Escala', required: true},
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    concepto: {type: Schema.Types.ObjectId, ref:'Concepto', required: true},
    cuota:{type: Schema.Types.ObjectId, ref:'Cuota', required: true},
    monto: {type:Number, required:true, default: 0},
    abono:{type: Number, required: true, default:0},
    interes:{type: Number, required: true, default:0},
    deuda:{type: Number, required: true, default:0},
    dscto:{type: Number, required: true, default:0},
    fechaVenc:{type: Date, required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('CtaCorriente',ctaCorrienteSchema);