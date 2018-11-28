const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let escalaCarreraSchema=new Schema({
    carrera:{type: Schema.Types.ObjectId, ref:'Carrera', required: true},
    escala:{type: Schema.Types.ObjectId, ref:'Escala', required: true},
    monto:{type: Number, required:true, default:0.00},
    fecha:{type: Date, required: true, default: Date.now()},
    nroCuota:{type: Number, required: true, default: 0},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario',required: true}
});

module.exports=mongoose.model('EscalaCarrera',escalaCarreraSchema);