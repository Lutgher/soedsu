import { Component, OnInit } from '@angular/core';
// import { SedesService } from '../../services/sedes/sedes.service';
import { Sede } from '../../models/sede';
import { Ambiente } from '../../models/ambiente';
import { NgForm } from '@angular/forms';
import { AmbienteService,SedesService } from 'src/app/services/service.index';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.component.html',
  styles: []
})
export class AmbientesComponent implements OnInit {

  sedes: Sede[]=[];
  ambiente: Ambiente=new Ambiente();

  constructor(
    public _sedeService:SedesService,
    public _ambienteService:AmbienteService
  ) { }

  ngOnInit() {
    this.cargarSede();
  }
  cargarSede(){
    this._sedeService.cargarSedes()
        .subscribe((resp:any)=>{
          this.sedes=resp.sede;
        });
  }

  guardarAmbiente(f: NgForm){
    if(f.invalid){
      return;
    }
    this._ambienteService.guardarAmbiente(this.ambiente)
        .subscribe();
    
  }

  cambiarSede(evento){

  }

}
