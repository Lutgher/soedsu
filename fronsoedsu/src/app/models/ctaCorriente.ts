export class CtaCorriente{
    constructor(
        public estudiante?:string,
        public escala?:string,
        public periodo?:string,
        public concepto?:string,
        public cuota?:string,
        public monto?:number,
        public abono?:number,
        public interes?:number,
        public deuda?:number,
        public dscto?:number,
        public fecha?:Date,
        public usuario?:string,
        public _id?:string
    ){}
}