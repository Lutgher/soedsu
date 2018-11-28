const mongoose=require('mongoose');
let Schema=mongoose.Schema;
let fechaVenSchema=new Schema({
    tipo:{type: Schema.Types.ObjectId, ref:'TipoCarrera', required: true},
    periodo:{type: Schema.Types.ObjectId, ref:'Periodo', required: true},
    cuota:{type: Number, required: true, default:0},
    fechaVenc: {type: Date},
    fecha:{type: Date, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
module.exports=mongoose.model('FechaVen',fechaVenSchema)