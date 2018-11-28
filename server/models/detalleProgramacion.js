const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let detallProgramacionSchema=new Schema({
    programacion:{type: Schema.Types.ObjectId, ref:'Programacion', required: true},
    horario:{type: Schemq.Types.ObjectId, ref:'Horario', required: true},
    lun:{type: String, required: false},
    mar:{type: String, required: false},
    mie:{type: String, required: false},
    jue:{type: String, required: false},
    vie:{type: String, required: false},
    sab:{type: String, required: false},
    dom:{type: String, required: false},
    fechaRegistro:{type: Date, required: true, default: Date.now()},
    fechaActividad:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types, ObjectId, ref:'Usuario', required: true}
});

module.exports=mongoose.model('DetalleProgramacion',detallProgramacionSchema);