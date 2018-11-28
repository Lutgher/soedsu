const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let horarioClaseSchema=new Schema({
    periodo:{type: Schema.Types.ObjectId, ref: 'Periodo'},
    programacion:{type: Schema.Types.ObjectId, ref: 'Programacion'},
    horaInicio:{type: String, required: false},
    horaFin:{type: String, required:false},
    fechaInicio:{type: Date, required: true},
    fechaFin:{type: Date, required: true},
    lun:{type: String, required: true, default: null},
    mar:{type: String, required: true, default: null},
    mie:{type: String, required: true, default: null},
    jue:{type: String, required: true, default: null},
    vie:{type: String, required: true, default: null},
    sab:{type: String, required: true, default: null},
    dom:{type: String, required: true, default: null},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, required: true}
});
module.exports=mongoose.model('HorarioClase',horarioClaseSchema);