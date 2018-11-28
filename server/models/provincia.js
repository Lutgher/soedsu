const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let provinciasSchema=new Schema({
    // codigo:{type: String, unique: [true, 'Ya existe el código'], required: true},
    descripcion:{type: String, required: true},
    departamento:{type: Schema.Types.ObjectId, ref:'Departamento', required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario', required: true}
});
provinciasSchema.plugin(uniqueValidator, '{PATH} debe de ser único');
module.exports=mongoose.model('Provincia',provinciasSchema);