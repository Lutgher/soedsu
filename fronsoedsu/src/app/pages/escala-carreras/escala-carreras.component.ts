import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { Escala } from '../../models/escala';
import { EscalaCarrera } from '../../models/escalaCarrera';
import { CarreraService, EscalaService, EscalaCarrerasService, TipoCarreraService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-escala-carreras',
  templateUrl: './escala-carreras.component.html',
  styles: []
})
export class EscalaCarrerasComponent implements OnInit {

  carreras: Carrera[]=[];
  escalas: Escala[]=[];
  escalaCarreras: EscalaCarrera[]=[];
  escalaCarrera: EscalaCarrera=new EscalaCarrera();

  constructor(
    public _carrerasService: CarreraService,
    public _escalaService: EscalaService,
    public _escalaCarreraService: EscalaCarrerasService
  ) { }

  ngOnInit() {
    this.cargarCarrera();
    this.cargarEscala();
    this.cargarEscalaCarrera();
  }

  cargarCarrera(){
    this._carrerasService.cargarCarrera()
        .subscribe((resp:any)=>{
          this.carreras=resp.carrera;
        });
  }
  cargarEscala(){
    this._escalaService.cargarEscalas()
        .subscribe((resp:any)=>{
          this.escalas=resp.escala;
        });
  }
  cargarEscalaCarrera(){
    this._escalaCarreraService.cargarEscalaCarrera()
        .subscribe((resp:any)=>{
          this.escalaCarreras=resp.escalaCarrera;
        });
  }
  guardarEscalaCarrera(f: NgForm){
    if(f.invalid){
      return;
    }
    this._escalaCarreraService.guardarEscalaCarrera(this.escalaCarrera)
        .subscribe(()=>{
          this.cargarEscalaCarrera();
        });
  }


  cambiarCarrera(evento){

  }
  cambiarEscala(evento){

  }
}
