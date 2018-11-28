export class Asignatura{
    constructor(
        public codigo?: string,
        public descripcion?: string,
        public estado?: string,
        public periodo?: string,
        public tipo?: string,
        public horasTeoria?: number,
        public horasLaboratorio?: number,
        public creditos?: string,
        public fecha?: Date,
        public usuario?: string,
        public _id?: string
    ){}
}