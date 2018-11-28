import { Component, OnInit } from '@angular/core';
import { DistritoService } from 'src/app/services/service.index';
import { Distrito } from '../../models/distrito';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styles: []
})
export class DistritoComponent implements OnInit {

  distritos:Distrito[]=[];
  desde:number=0;
  totalReg: number=0;

  constructor(
    public _distritoService: DistritoService
  ) { }

  ngOnInit() {
    this.cargarDistrito();
  }

  cargarDistrito(){
    this._distritoService.cargarDistritos(this.desde)
    .subscribe((resp:any)=>{
        // .subscribe(distritos=>{
          this.totalReg=resp.total;
          this.distritos=resp.distrito;
        })
  }
  cambiarDesde(valor: number=0){
    let desde=this.desde+valor;
    if(desde>=this._distritoService.totalDist){
      return;
    }
    if(desde<0){
      return;
    }
    this.desde +=valor;
    this.cargarDistrito();
  }
  guardarDistrito(distrito: Distrito){
    this._distritoService.guardarDistrito(distrito)
        .subscribe(()=>this.cargarDistrito());
  }
  borrarDistrito(distrito: Distrito){
    this._distritoService.eliminarDistrito(distrito._id).subscribe(()=>this.cargarDistrito());
  }
}
