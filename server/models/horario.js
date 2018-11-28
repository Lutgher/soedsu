const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let horarioSchema=new Schema({
    codigo:{type: String, required: true, maxlength:3},
    descripcion:{type: String, required: true},
    horaInicio:{type: String, required: true},
    horaFin:{type: String, required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('Horario',horarioSchema);