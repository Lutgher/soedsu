import { Component, OnInit } from '@angular/core';
import { Periodo } from '../../models/periodo.model';
import { PeriodoService } from '../../services/service.index';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styles: []
})
export class PeriodoComponent implements OnInit {

  periodos: Periodo[]=[];

  constructor(
    public _periodoService: PeriodoService
  ) { }

  ngOnInit() {
    this.cargarPeriodos();

  } 

  buscarPeriodo(termino: string){
    if(termino.length<=0){
      this.cargarPeriodos();
      return;
    }
    this._periodoService.buscarPeriodo(termino).subscribe(periodos=>this.periodos=periodos);
  }
  cargarPeriodos(){
    this._periodoService.cargarPeriodos()
        .subscribe((resp:any)=>{
          this.periodos=resp.periodo;
        });
  }
  crearPeriodo(periodo: Periodo){
    swal({
      title: 'Crear Periodo',
      
    });
  }

  guardarPeriodo(periodo: Periodo){
    this._periodoService.actualizarPeriodo(periodo).subscribe(()=>this.cargarPeriodos());
  }

}
