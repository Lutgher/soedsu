const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let periodoSchema=new Schema({
    nombre:{type: String, unique:[true,'El periodo es único'], required: true},
    fechaInicio:{type: Date, required: [true, 'Es nesecario que ingrese la fecha de inicio']},
    fechaFin:{type: Date,required:[true,'Es nesecario que ingrese la fecha fin']},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId,ref:'Usuario', required: true}
});
periodoSchema.plugin(uniqueValidator,{message: '{PATH} es único'});
module.exports=mongoose.model('Periodo',periodoSchema);