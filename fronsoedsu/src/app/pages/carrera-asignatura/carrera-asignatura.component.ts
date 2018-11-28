import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/services/service.index';
import { CarreraAsignatura } from '../../models/carrera-asignatura';

@Component({
  selector: 'app-carrera-asignatura',
  templateUrl: './carrera-asignatura.component.html',
  styles: []
})
export class CarreraAsignaturaComponent implements OnInit {

  carrerasAsignaturas: CarreraAsignatura[]=[];
  totalReg: number=0;
  constructor(
    public _carreraService: CarreraService
  ) { }

  ngOnInit() {
  }

  cargarAsignaturas(){
    this._carreraService.cargarCarrera()
        .subscribe((resp:any)=>{
          this.carrerasAsignaturas=resp.carreraAsignatura;
          this.totalReg=resp.total;
        });
  }

}
