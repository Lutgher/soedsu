import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado';
import { Concepto } from '../../models/conceptos';
import { ConceptosService, EstadoService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styles: []
})
export class ConceptosComponent implements OnInit {

  estados: Estado[]= [];
  conceptos:Concepto[]= [];
  concepto: Concepto=new Concepto;

  constructor(
    public _conceptoService: ConceptosService,
    public _estadoService: EstadoService
  ) { }

  ngOnInit() {
    this.cargarConcepto();
    this.cargarEstado();
  }

  cargarEstado(){
    this._estadoService.cargarEstado()
        .subscribe((resp:any)=>{
          this.estados=resp.estado
        });
  }

  cargarConcepto(){
    this._conceptoService.cargarConceptos()
        .subscribe((resp:any)=>{
          this.conceptos=resp.concepto;
        });
  }

  guardarConcepto(f: NgForm){
    if(f.invalid){
      return;
    }
    this._conceptoService.guardarConceptos(this.concepto)
        .subscribe(()=>{
          this.cargarConcepto();
        });
  }
  cambiarEstado(evento){
    
  }

}
