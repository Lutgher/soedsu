const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let matriculaSchema=new Schema({
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    persona:{type: Schema.Types.ObjectId, ref:'Persona', required: true},
    carrera:{type: Schema.Types.ObjectId, ref:'Carrera', required: true},
    sede:{type: Schema.Types.ObjectId, ref:'Sede', required: true},
    planEstudio:{type: Schema.Types.ObjectId, ref:'PlanEstudio', required: true},
    fechaMatricula:{type: Date, required: true, default: Date.now()},
    estadoInicio:{type: String, required: true, default:'MA'},
    estadoProceso:{type: String, required: true, default:'AC'},
    fecha:{type:Date, required: true, default: Date.now()},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('Matricula',matriculaSchema);