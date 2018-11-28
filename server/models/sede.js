const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let sedeSchema=new Schema({
    codigo:{type: String, unique:[true,'Ya éxiste el código'], required:true},
    // periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    descripcion:{type: String, required: true},
    direccion:{type: String, required: true},
    distrito:{type: Schema.Types.ObjectId, ref:'Distrito', required:true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required:true}
});
sedeSchema.plugin(uniqueValidator,'{PATH} debe de ser único');
module.exports=mongoose.model('Sede',sedeSchema);