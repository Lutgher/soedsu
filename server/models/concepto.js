//conceptos de pago
const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let conceptoSchema=new Schema({
    codigo:{type: String, unique:[true,'Ya existe un concepto con este código'], required: true},
    descripcion:{type: String, required: true},
    obligatorio:{type: String, required: true, default:'NO'},
    estado:{type: Schema.Types.ObjectId, ref:'Estado', required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});

conceptoSchema.plugin(uniqueValidator,'{PATH}, debe de ser único');
module.exports=mongoose.model('Concepto',conceptoSchema);