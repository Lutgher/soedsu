const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let tipoCarreraSchema=new Schema({
    nombre: {type: String, unique:[true,'Debe de ser único'], required: true},
    fecha: {type: Date, default: Date.now},
    usuario: {type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
mongoose.plugin(uniqueValidator,{message:'{PATH} es único'});
module.exports=mongoose.model('TipoCarrera',tipoCarreraSchema);