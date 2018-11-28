import { Component, OnInit } from '@angular/core';
import { EstadoService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Estado } from '../../models/estado';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styles: []
})
export class EstadosComponent implements OnInit {

  public estado: Estado=new Estado();

  constructor(
    public _estadoService: EstadoService,
    public router: Router,
    public activitedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  guardarEstado(f: NgForm){
    if(f.invalid){
      return;
    }
    this._estadoService.guardarEstado(this.estado)
        .subscribe(estado=>{
          this.estado._id=estado._id;
        });
  }
  cambiaEstado(event){

  }

}
