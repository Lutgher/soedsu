import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../models/asignatura';
import { AsignaturaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styles: []
})
export class AsignaturasComponent implements OnInit {

  asignaturas: Asignatura[]=[];
  asignatura: Asignatura=new Asignatura();

  constructor(
    public _asignaturaService: AsignaturaService
  ) { }

  ngOnInit() {
    this.cargarAsignatura();
  }

  cargarAsignatura(){
    this._asignaturaService.cargarAsignatura()
        .subscribe((resp:any)=>{
          this.asignaturas=resp.asignatura;
        });
  }

}
