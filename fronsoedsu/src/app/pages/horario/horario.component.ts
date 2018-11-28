import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/horario';
import { HorarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styles: []
})
export class HorarioComponent implements OnInit {

  horarios:Horario[]=[];
  horario: Horario=new Horario();

  constructor(
    public _horarioService: HorarioService
  ) { }

  ngOnInit() {
    this.cargarHorario();
  }

  cargarHorario(){
    this._horarioService.cargarHorario()
        .subscribe((resp:any)=>{
          this.horarios=resp.horario;
        });
  }

  guardarHorario(f: NgForm){
    if(f.invalid){
      return;
    }
    this._horarioService.guardarHorario(this.horario)
        .subscribe(()=>{
          this.cargarHorario();
        });
  }

}
