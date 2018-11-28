const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let rolSchema=new Schema({
    nombre:{type: String, required: true},
    descripcion:{type: String, required: false},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'rol', required: true}
});
module.exports=mongoose.model('Rol',rolSchema);