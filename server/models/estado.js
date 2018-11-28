const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let estadoSchema=new Schema({
    codigo:{type: String,unique:[true,'No se puede utilizar'], required: true},
    descripcion:{type: String, unique:[true, 'No se puede utilizar'], required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario'}
});
estadoSchema.plugin(uniqueValidator,'{PATH} Debe de ser único');
module.exports=mongoose.model('Estado',estadoSchema);