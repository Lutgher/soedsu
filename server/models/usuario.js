const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;

let usuarioSchema=new Schema({
    nombre:{type: String, required: true},
    email:{type:String,unique:[true,'El correo ya esta registrado con otro usuario'], required: true},
    img:{type: String, required:false},
    password:{type:String, required:true},
    estado:{type: Boolean, required:true, default:true},
    role:{type: String, required:true,default:'USER_STUDENT'}
});

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser único'});
module.exports=mongoose.model('Usuario',usuarioSchema);