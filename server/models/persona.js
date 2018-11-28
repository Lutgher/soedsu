const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema=mongoose.Schema;
let personasSchema=new Schema({
    apellidoPaterno:{type: String, required: false, default: null},
    apellidoMaterno:{type: String, required: false, default: null},
    nombre:{type: String, required: false, default: null},
    nroDocumento:{type: String, unique:[true,'El nro documento'], required: true},
    alias:{type: String, required: false},
    nroTelefono:{type: String, required: false, default: null},
    celular:{type: String, required: false, default: null},
    email:{type: String, required: false, default: null},
    tipoPersona:{type: String, required: true},
    sexo:{type: String, required: false, default: null},
    fechaNacimiento:{type: Date, required: false},
    distrito:{type: Schema.Types.ObjectId, ref: 'Distrito', required: false},
    provincia:{type: Schema.Types.ObjectId, ref: 'Provincia', required: false},
    departamento:{type: Schema.Types.ObjectId, ref: 'Departamento', required: false},
    direccion:{type: String},
    distritoDireccion:{type: Schema.Types.ObjectId, ref:'Distrito', required: false},
    provinciaDireccion:{type: Schema.Types.ObjectId, ref:'Provincia', required: false},
    departamentoDireccion:{type: Schema.Types.ObjectId, ref:'Departamento', required: false},
    fecha:{type: Date, required: true, default: Date.now()},
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario', required: true}
});
mongoose.plugin(uniqueValidator,{message: '{PATH} debe de ser único'})
module.exports=mongoose.model('Persona', personasSchema);