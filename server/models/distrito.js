const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let distritosSchema=new Schema({
    descripcion:{type: String, required: true},
    departamento:{ type: Schema.Types.ObjectId, ref:'Departamento', required: true},
    provincia:{type: Schema.Types.ObjectId, ref:'Provincia', required: true},
    fecha:{type: Date, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
});
module.exports=mongoose.model('Distrito',distritosSchema);