const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let carreraAsignaturaSchema=new Schema({
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    carrera:{type: Schema.Types.ObjectId, ref:'Carrera', required: true},
    asignatura:{type: Schema.Types.ObjectId, ref:'Asignatura',required: true},
    planEstudio:{type: Schema.Types.ObjectId, ref:'planEstudio', required: true},
    codigo:{type: String, required: true},
    descripcion:{type: String, required: true},
    horasTeoria:{type: Number, required: true, default: 0},
    horasLaboratorio:{type: Number, required: true, default: 0},
    creditos:{type: Number, required: true, default: 0},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('CarreraAsignatura',carreraAsignaturaSchema);