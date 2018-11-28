import { Component, OnInit } from '@angular/core';
import { EstadoService, TipoAsignaturaService } from 'src/app/services/service.index';
import { Estado } from '../../models/estado';
import { TipoAsignatura } from '../../models/tipoAsignatura';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipoasignatura',
  templateUrl: './tipoasignatura.component.html',
  styles: []
})
export class TipoasignaturaComponent implements OnInit {

  estados: Estado[]=[];
  tipoAsignatura: TipoAsignatura=new TipoAsignatura();

  constructor(
    public _estadoService: EstadoService,
    public _tipoAsignatura: TipoAsignaturaService
  ) { }

  ngOnInit() {
    this.cargarEstado();
  }
  cargarEstado(){
    this._estadoService.cargarEstado()
        .subscribe((resp:any)=>{
          this.estados=resp.estado;
        });
  }

  guardarTipoAsignatura(f: NgForm){
    if(f.invalid){
      return;
    }
    this._tipoAsignatura.guardarTipoAsignatura(this.tipoAsignatura)
        .subscribe()
        // tipoAsignatura=>{
          // this.tipoAsignatura._id=tipoAsignatura._id;
        // })
  }
  cambioEstado(evento){

  }

}
