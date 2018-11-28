import { Component, OnInit } from '@angular/core';
import { CarreraService, PeriodoService, TipoCarreraService } from 'src/app/services/service.index';
import { Carrera } from '../../models/carrera';
import { NgForm } from '@angular/forms';
import { Periodo } from 'src/app/models/periodo.model';
import { TipoCarrera } from 'src/app/models/tipoCarrera';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styles: []
})
export class CarreraComponent implements OnInit {

  carreras: Carrera[]=[];
  carrera: Carrera=new Carrera();
  periodos:Periodo[]=[];
  tiposCarreras: TipoCarrera[]=[];
  constructor(
    public _carreraService: CarreraService,
    public _periodoService: PeriodoService,
    public _tipoCarrera: TipoCarreraService
  ) { }

  ngOnInit() {
    this.cargarPeriodo();
    this.cargarCarrera();
    this.cargarTipoCarrera();
  }

  cargarPeriodo(){
    this._periodoService.cargarPeriodos()
        .subscribe((resp:any)=>{
          this.periodos=resp.periodo;
        });
  }
  cargarTipoCarrera(){
    this._tipoCarrera.cargarTipoCarrera()
        .subscribe(resp=>{
          this.tiposCarreras=resp.tipoCarrera
        });
  }
  cargarCarrera(){
    this._carreraService.cargarCarrera()
        .subscribe((resp:any)=>{
          this.carreras=resp.carrera;
        });
  }
  guardarCarrera(f: NgForm){
    if(f.invalid){
      return;
    }
    this._carreraService.guardarCarrera(this.carrera)
        .subscribe(()=>{
          this.cargarCarrera();
        });
  }
  cambiarPeriodo(evneto){

  }
  cambiarCarrera(evento){

  }
}
