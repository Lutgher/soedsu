const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let escalaSchema=new Schema({
    codigo:{type: String, required: true},
    descripcion:{type: String, required: true},
    estado:{type: Schema.Types.ObjectId, ref:'Estado',required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario',required: true}
});
module.exports=mongoose.model('Escala',escalaSchema);