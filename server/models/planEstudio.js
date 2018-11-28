const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let planEstudioSchema=new Schema({
    codigo:{type: String,unique:[true,'debe de ser único'], required: true},
    periodo:{type: Schema.Types.ObjectId,ref:'Periodo', required: true},
    descripcion:{type: String, required: true},
    estado:{type: Schema.Types.ObjectId, ref:'Estado', required: true},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario'}
});
planEstudioSchema.plugin(uniqueValidator,{message:'{PATH} es único'});
module.exports=mongoose.model('PlanEstudio',planEstudioSchema);