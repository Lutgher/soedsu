const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let carreraSchema=new Schema({
    tipo:{type: Schema.Types.ObjectId, ref:'TipoCarrera', required: true},
    codigo:{type: String,unique:[true,'Ya existe el código'], required: true},
    descripcion:{type: String, required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    estado:{type: Boolean, required: true, default: true},
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
})
carreraSchema.plugin(uniqueValidator,'{PATH} debe de ser único');
module.exports=mongoose.model('Carrera',carreraSchema);