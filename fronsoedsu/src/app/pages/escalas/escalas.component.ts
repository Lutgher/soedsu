import { Component, OnInit } from '@angular/core';
import { EstadoService, EscalaService } from 'src/app/services/service.index';
import { Estado } from '../../models/estado';
import { Escala } from '../../models/escala';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-escalas',
  templateUrl: './escalas.component.html',
  styles: []
})
export class EscalasComponent implements OnInit {

  estados: Estado[]=[];
  escalas: Escala[]=[];
  escala: Escala=new Escala();

  constructor(
    public _estadoService: EstadoService,
    public _escalaService: EscalaService
  ) { }

  ngOnInit() {
    this.cargarEscala();
    this.cargarEstado();
  }
  cargarEstado(){
    this._estadoService.cargarEstado()
        .subscribe((resp:any)=>{
          this.estados=resp.estado;
        });
  }
  cargarEscala(){
    this._escalaService.cargarEscalas()
        .subscribe((resp:any)=>{
          this.escalas=resp.escala;
        })
  }
  guardarEscala(f: NgForm){
    if(f.invalid){
      return;
    }
    this._escalaService.guardarEscalas(this.escala)
        .subscribe(()=>{
          this.cargarEscala();
        });
  }

  cambiarEstado(evento){

  }
}
