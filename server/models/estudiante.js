const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let estudiantesSchema=new Schema({
    persona:{type: Schema.Types.ObjectId, ref:'Persona', required: true},
    codigo:{type: String, required: true},
    nombre:{type: String, required: true},
    carrera:{type: Schema.Types.ObjectId, ref:'Carrera'},
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo'},
    sede:{type: Schema.Types.ObjectId, ref:'Sede'},
    estado:{type: Schema.Types.ObjectId, ref:'Estado'},
    tipoEstudiante:{type: Schema.Types.ObjectId, ref:'TipoEstudiante',required:true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario'}
});
module.exports=mongoose.model('Estudiante',estudiantesSchema);