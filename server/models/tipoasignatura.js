const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let tipoAsignaturaSchema=new Schema({
    codigo:{type:String, unique:[true, 'Ya existe el código'], required: true},
    descripcion:{type:String, required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    estado:{type: Schema.Types.ObjectId, ref:'Estado', required:true},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
tipoAsignaturaSchema.plugin(uniqueValidator,'{PATH} debe de ser único');
module.exports=mongoose.model('TipoAsignatura',tipoAsignaturaSchema);