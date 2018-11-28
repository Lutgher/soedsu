import { Component, OnInit } from '@angular/core';
import { PlanEstudio } from '../../models/planEstudio';
import { PlanEstudiosService, PeriodoService, EstadoService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Periodo } from 'src/app/models/periodo.model';
import { Estado } from '../../models/estado';

@Component({
  selector: 'app-plan-estudios',
  templateUrl: './plan-estudios.component.html',
  styles: []
})
export class PlanEstudiosComponent implements OnInit {

  planEstudios: PlanEstudio[]=[];
  periodos: Periodo[]=[];
  estados: Estado[]=[];
  planEstudio: PlanEstudio=new PlanEstudio();

  constructor(
    public _planEstudioService: PlanEstudiosService,
    public _periodoService: PeriodoService,
    public _estadoService: EstadoService
  ) { }

  ngOnInit() {
    this.cargarPlan();
    this.cargaPeriodo();
    this.cargarEstados();
  }

  cargarPlan(){
    this._planEstudioService.cargarPlan()
        .subscribe((resp:any)=>{
          this.planEstudios=resp.planEstudio;
        });
  }
  cargaPeriodo(){
    this._periodoService.cargarPeriodos()
        .subscribe((resp:any)=>{
          this.periodos=resp.periodo;
        });
  }
  cargarEstados(){
    this._estadoService.cargarEstado()
        .subscribe((resp:any)=>{
          this.estados=resp.estado;
        });
  }
  guardarPlan(f: NgForm){
    if(f.invalid){
      return;
    }
    this._planEstudioService.guardarPlan(this.planEstudio)
        .subscribe(()=>{
          this.cargarPlan();
        });
  }

  cambiarPeriodo(evento){

  }

  cambioEstado(evento){

  }


}
