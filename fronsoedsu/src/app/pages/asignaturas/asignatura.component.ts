import { Component, OnInit } from '@angular/core';
import { PeriodoService, TipoAsignaturaService, EstadoService, AsignaturaService } from 'src/app/services/service.index';
import { TipoAsignatura } from 'src/app/models/tipoAsignatura';
import { Periodo } from 'src/app/models/periodo.model';
import { Estado } from 'src/app/models/estado';
import { Asignatura } from '../../models/asignatura';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styles: []
})
export class AsignaturaComponent implements OnInit {

  tipoAsignaturas: TipoAsignatura[]=[];
  periodos: Periodo[]=[];
  estados: Estado[]=[];
  asignatura: Asignatura=new Asignatura();

  constructor(
    public _periodoServide: PeriodoService,
    public _tipoAsignatura: TipoAsignaturaService,
    public _estadoService: EstadoService,
    public _asignaturaService: AsignaturaService
  ) { }

  ngOnInit() {
    this.cargarEstado();
    this.cargarPeriodo();
    this.cargarTipoAsignatura();
  }
  
  cargarPeriodo(){
    this._periodoServide.cargarPeriodos()
        .subscribe((resp:any)=>{
          this.periodos=resp.periodo;
        });
  }
  cargarEstado(){
    this._estadoService.cargarEstado()
        .subscribe((resp:any)=>{
          this.estados=resp.estado
        });
  }
  cargarTipoAsignatura(){
    this._tipoAsignatura.cargarTipoAsignatura()
        .subscribe((resp:any)=>{
          this.tipoAsignaturas=resp.tipoAsignatura;
        });
  }
  guardarAsignatura(f: NgForm){
    if(f.invalid){
      return;
    }
    this._asignaturaService.guardarAsignatura(this.asignatura)
        .subscribe();
    
  }

}
