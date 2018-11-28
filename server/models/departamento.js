const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let departamentosSchema=new Schema({
    descripcion:{type: String, unique:[true, 'Ya existe el departamento'], required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario'}
});
departamentosSchema.plugin(uniqueValidator,'{PATH} debe de ser único');
module.exports=mongoose.model('Departamento',departamentosSchema);