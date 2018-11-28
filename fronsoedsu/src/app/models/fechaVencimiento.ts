export class FechaVencimiento{
    constructor(
        public tipo?:string,
        public periodo?:string,
        public cuota?:number,
        public fechaVenc?:Date,
        public fecha?:Date,
        public usuario?:string,
        public _id?:string,
    ){}
}