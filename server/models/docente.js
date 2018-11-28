const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let docenteSchema=new Schema({
    periodo:{type: Schema.type.ObjectId, ref:'Periodo'},
    persona:{type: Schema.Types.ObjectId, ref:'Persona', required: true},
    gradoInstruccion:{type: Schema, required: true},
    profesion:{type: String, required: true},
    estado:{type: Schema.Types.ObjectId, ref:'Estado'},
    fechaInicio:{type: Date, required: true},
    fechaFin:{type: Date, required:false},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario',required: true}
});
module.exports=mongoose.model('Docente',docenteSchema);