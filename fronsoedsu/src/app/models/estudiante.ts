export class Estudiante{
    constructor(
        public persona?:string,
        public codigo?:string,
        public nombre?:string,
        public carrera?:string,
        public periodo?:string,
        public sede?:string,
        public estado?:string,
        public tipoEstudiante?:string,
        public fecha?:Date,
        public usuario?:string,
        public _id?: string
    ){}
}