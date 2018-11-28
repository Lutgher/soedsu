const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let asignaturaSchema=new Schema({
    codigo:{type:String, unique:[true, 'Ya existe el código'],required:true, maxlength: 10},
    descripcion:{type: String, required: true},
    estado:{type: Schema.Types.ObjectId, ref:'Estado'},
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo',required:true},
    tipo:{type: Schema.Types.ObjectId, ref:'TipoAsignatura', required: true},
    horasTeoria:{type: Number, required: true, default: 0},
    horasLaboratorio:{type: Number, required: true, default: 0},
    creditos:{type: Number, required: true, default: 0},
    fecha:{type: String, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
asignaturaSchema.plugin(uniqueValidator,'{PATH} debe de ser único');
module.exports=mongoose.model('Asignatura', asignaturaSchema);