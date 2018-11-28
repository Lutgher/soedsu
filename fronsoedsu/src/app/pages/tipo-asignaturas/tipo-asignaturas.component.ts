import { Component, OnInit } from '@angular/core';
import { TipoAsignaturaService } from '../../services/service.index';
import { TipoAsignatura } from '../../models/tipoAsignatura';


@Component({
  selector: 'app-tipo-asignaturas',
  templateUrl: './tipo-asignaturas.component.html',
  styles: []
})
export class TipoAsignaturasComponent implements OnInit {

  tipoAsignaturas: TipoAsignatura[]=[];

  totalReg: number=0;

  constructor(
    public _tipoAsignaturaService: TipoAsignaturaService
  ) { }

  ngOnInit() {
    this.cargarTipoAsignatura();
  }

  cargarTipoAsignatura(){
    this._tipoAsignaturaService.cargarTipoAsignatura()
        .subscribe((resp:any)=>{
          this.totalReg=resp.total;
          this.tipoAsignaturas=resp.tipoAsignatura
        });
  }

}
