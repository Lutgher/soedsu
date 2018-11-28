import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/service.index';
import { Estado } from '../../models/estado';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styles: []
})
export class EstadoComponent implements OnInit {

  estados: Estado[]=[];

  constructor(
    public _estadoService: EstadoService,

  ) { }

  ngOnInit() {
    this.cargarEstado();
  }

  cargarEstado(){
    this._estadoService.cargarEstado().subscribe((resp:any)=>this.estados=resp.estado);
  }

}
