import { Component, OnInit } from '@angular/core';
import { TipoEstudianteService } from 'src/app/services/service.index';
import { TipoEstudiante } from '../../models/tipoEstudiante';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipo-estudiante',
  templateUrl: './tipo-estudiante.component.html',
  styles: []
})
export class TipoEstudianteComponent implements OnInit {

  tipoEstudiantes: TipoEstudiante[]=[];
  tipoEstudiante: TipoEstudiante=new TipoEstudiante();

  constructor(
    public _tipoEstudianteService: TipoEstudianteService
  ) { }

  ngOnInit() {
    this.cargarTipoEstudiante();
  }

  cargarTipoEstudiante(){
    this._tipoEstudianteService.cargarTipoEstudiante()
        .subscribe((resp:any)=>{
          this.tipoEstudiantes=resp.tipoEstudiante;
        });
  }

  guardarTipoEstudiante(f:NgForm){
    if(f.invalid){
      return;
    }
    this._tipoEstudianteService.guardarTipoEstudiante(this.tipoEstudiante)
        .subscribe(()=>{
          this.cargarTipoEstudiante();
        });
  }

}
