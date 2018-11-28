const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let programacionSchema=new Schema({
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    seccion:{type: Number, required: true, maxlength:10},
    sede:{type: Schema.Types.ObjectId, ref:'Sede', required:true},
    estado:{type: String, required: true},
    fechaInicio:{type:Date, required:[true,'Debe de ingresar la fecha de inicio']},
    fechaFin:{type: Date, required:[true,'debe de ingresar la fecha fin']},
    tipoSeccion:{type: String, required: true},
    horasTeoria:{type: Number, required: true, default:0},
    horasLaboratorio:{type: Number, required: true, default:0},
    semanas:{type: Number, required: true},
    horasCredito:{type:Number, required: true},
    vacantesMaximo:{type: Number, required: true, default:0},
    vacantesDisponibles:{type: Number, required: true, default:0},
    matriculados:{type:Number, required:true, default:0},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required:true}
});
module.exports=mongoose.model('Programacion',programacionSchema);