import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/service.index';
import { Estudiante } from '../../models/estudiante';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: []
})
export class EstudianteComponent implements OnInit {

  estudiantes:Estudiante[]=[];
  totalReg: number=0;

  constructor(
    public _estudianteService: EstudianteService
  ) { }

  ngOnInit() {
    this.cargarEstudiante();
  }

  cargarEstudiante(){
    this._estudianteService.cargarEstudiantes()
        .subscribe((resp:any)=>{
          this.totalReg=resp.total;
          this.estudiantes=resp.estudiante;
        });
  }

  buscaEstudiantePeriodo(){
    
  }
}
