export class CarreraAsignatura{
    constructor(
        public periodo?:string,
        public carrera?:string,
        public asignatura?:string,
        public planEstudio?:string,
        public horasTeoria?:number,
        public horasLaboratorio?:number,
        public creditos?:number,
        public fecha?:Date,
        public usuario?:string,
        public _id?: string
    ){}
}