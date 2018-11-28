import { Component, OnInit } from '@angular/core';
import { PersonasService } from 'src/app/services/service.index';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: []
})
export class PersonaComponent implements OnInit {

  personas:Persona[]=[];
  totalReg: number=0;

  constructor(
    public _personaService: PersonasService
  ) { }

  ngOnInit() {
    this.cargaPersona();
  }

  cargaPersona(){
    this._personaService.cargarPersonas()
        .subscribe((resp:any)=>{
          this.totalReg=resp.total;
          this.personas=resp.persona;
        });
  }

  buscarPersona(termino:string){
    if(termino.length<=0){
      this.cargaPersona();
      return;
    }
    this._personaService.buscarPersona(termino)
        .subscribe((personas: Persona[])=>{
          this.personas=personas;
        });
  }

}
