import { Component, OnInit } from '@angular/core';
import { TipoCarreraService } from 'src/app/services/service.index';
import { TipoCarrera } from '../../models/tipoCarrera';

declare var swal: any;
@Component({
  selector: 'app-tipo-carrera',
  templateUrl: './tipo-carrera.component.html',
  styles: []
})
export class TipoCarreraComponent implements OnInit {

  tiposCarreras:TipoCarrera[]=[];

  constructor(
    public _tipoAsignaturaService: TipoCarreraService
  ) { }

  ngOnInit() {
    this.cargarTipoCarrera();
  }

  cargarTipoCarrera(){
    this._tipoAsignaturaService.cargarTipoCarrera()
        .subscribe(resp=>{
          this.tiposCarreras=resp.tipoCarrera;
        });
  }
  registrarTipoCarrera(){
    swal({
      title: 'Crear Tipo Carrera',
      text: 'Ingrese el tipo de Carrera a crear',
      content: 'input',
      buttons: true,
      dangerMode: true
    })
    .then( (valor: string) =>{
      if(!valor || valor.length<=0) return;
      this._tipoAsignaturaService.registrarTipoCarrera(valor).subscribe(()=>this.cargarTipoCarrera());
    });
  }

}
