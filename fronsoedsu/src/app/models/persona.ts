export class Persona{
    constructor(
        public apellidoPaterno?: string,
        public apellidoMaterno?: string,
        public nombre?:string,
        public nroDocumento?:string,
        public alias?:string,
        public nroTelefono?:string,
        public celular?:string,
        public email?:string,
        public sexo?: string,
        public tipoPersona?:string,
        public fechaNacimiento?:Date,
        public distrito?:string,
        public provincia?:string,
        public departamento?:string,
        public direccion?:string,
        public distritoDireccion?:string,
        public provinciaDireccion?:string,
        public departamentoDireccion?:string,
        public fecha?:Date,
        public usuario?:string,
        public _id?:string
    ){}
}