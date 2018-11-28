import { Component, OnInit } from '@angular/core';
import { ProvinciasService, DepartamentoService } from 'src/app/services/service.index';
import { Provincia } from 'src/app/models/provincia';
import { Departamento } from '../../models/departamento';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styles: []
})
export class ProvinciaComponent implements OnInit {

  provincias: Provincia[]=[];
  departamentos: Departamento[]=[];
  desde: number=0;
  totalReg: number=0;

  constructor(
    public _provinciaService: ProvinciasService
  ) { }

  ngOnInit() {
    this.cargarProvincias();
  }

  // cargarProvincias(){
  //   this._provinciaService.cargarProvincia(this.desde)
  //       .subscribe(provincias=>{
  //         this.provincias=provincias;
  //       });
  // }

  cargarProvincias(){
    // console.log(this.desde);
    this._provinciaService.cargarProvincia(this.desde)
        .subscribe((resp: any)=>{
          this.totalReg=resp.total;
          this.provincias=resp.provincia;
        });
  }

  cambiarDesde(valor: number=0){
    let desde=this.desde+valor;
    if(desde>=this.totalReg){
      return;
    }
    if(desde<0){
      return;
    }
    this.desde += valor;
    this.cargarProvincias();
  }

  listaProvDpto(dpto: string){
    this._provinciaService.listaProvDepto(dpto)
        .subscribe(provincias=>{
          this.provincias=provincias;
        });
  }
  borrarProvincia(provincia: Provincia){
    this._provinciaService.eliminarProvincia(provincia._id).subscribe(()=>this.cargarProvincias());
  }
  buscarProvincia(termino: string){
    if(termino.length<=0){
      this.cargarProvincias();
      return;
    }
    this._provinciaService.buscarProvincia(termino).subscribe(provincias=> this.provincias=provincias);
  }

}
