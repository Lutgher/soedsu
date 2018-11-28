const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let sexoSchema=new Schema({
    codigo:{type: String, required: true},
    descripcion:{type:String, required: true}
})
module.exports=mongoose.model('Sexo',sexoSchema);