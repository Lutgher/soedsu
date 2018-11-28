export class PlanEstudio{
    constructor(
        public codigo?: string,
        public periodo?: string,
        public descripcion?: string,
        public estado?: string,
        public fecha?: Date,
        public usuario?: string,
        public _id?:string
    ){}
}