export class Concepto{
    constructor(
        public codigo?:string,
        public descripcion?:string,
        public estado?:string,
        public obligatorio?:string,
        public fecha?:Date,
        public usuario?:string,
        public _id?:string
    ){}
}