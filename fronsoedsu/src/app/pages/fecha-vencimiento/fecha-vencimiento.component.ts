import { Component, OnInit } from '@angular/core';
import { FechaVencimientoService, TipoCarreraService, PeriodoService } from 'src/app/services/service.index';
import { FechaVencimiento } from '../../models/fechaVencimiento';
import { Periodo } from '../../models/periodo.model';
import { TipoCarrera } from '../../models/tipoCarrera';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fecha-vencimiento',
  templateUrl: './fecha-vencimiento.component.html',
  styles: []
})
export class FechaVencimientoComponent implements OnInit {
  fechaVencimientos: FechaVencimiento[]=[];
  periodos: Periodo[]=[];
  tipoCarreras:TipoCarrera[]=[];
  fechaVencimiento: FechaVencimiento=new FechaVencimiento();
  
  constructor(
    private _fechaVencimientoService: FechaVencimientoService,
    private _tipoCarreraService: TipoCarreraService,
    private _periodo: PeriodoService
  ) { }

  ngOnInit() {
      this.cargarFechaVenc();
      this.cargarPeriodo();
      this.cargarTipoCarrera();
  }

  cargarFechaVenc(){
    this._fechaVencimientoService.cargarFechaVencimiento()
        .subscribe(resp=>{
          this.fechaVencimientos=resp.fechaVencPen;
        })
  }

  cargarPeriodo(){
    this._periodo.cargarPeriodos()
        .subscribe((resp:any)=>{
          this.periodos=resp.periodo
        })
  }

  cargarTipoCarrera(){
    this._tipoCarreraService.cargarTipoCarrera()
        .subscribe((resp:any)=>{
          this.tipoCarreras=resp.tipoCarrera
        })
  }

  guardarFechaVenc(f: NgForm){
    if(f.invalid){
      return;
    }
    this._fechaVencimientoService.guardarFechaVencimiento(this.fechaVencimiento)
        .subscribe(()=>this.cargarFechaVenc());
  }

  cambioFechaVenc(evento){

  }
  cambioPeriodo(evento){

  }
  cambioTipoCarrera(evento){

  }

}
