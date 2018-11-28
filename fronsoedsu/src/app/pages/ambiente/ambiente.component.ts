import { Component, OnInit } from '@angular/core';
import { AmbienteService } from 'src/app/services/service.index';
import { Ambiente } from '../../models/ambiente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styles: []
})
export class AmbienteComponent implements OnInit {

  ambientes: Ambiente[]=[];

  constructor(
    public _ambienteService:AmbienteService
  ) { }

  ngOnInit() {
    this.cargarAmbientes();
  }

  cargarAmbientes(){
    this._ambienteService.cargarAmbiente().subscribe((resp:any)=>this.ambientes=resp.ambiente);
  }

  guardarAmbiente(f: NgForm){
    if(f.invalid){
      return;
    }
    
  }

}
