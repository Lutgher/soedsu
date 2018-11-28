import { Component, OnInit } from '@angular/core';
import { SedesService, DepartamentoService, ProvinciasService, DistritoService } from 'src/app/services/service.index';
import { Sede } from '../../models/sede';
import { Departamento } from '../../models/departamento';
import { Provincia } from 'src/app/models/provincia';
import { Distrito } from '../../models/distrito';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styles: []
})
export class SedesComponent implements OnInit {

  departamentos: Departamento[]=[];
  provincias: Provincia[]=[];
  distritos: Distrito[]=[];
  departamento: Departamento=new Departamento();
  provincia: Provincia=new Provincia();
  distrito: Distrito=new Distrito();
  sedes: Sede[]=[];
  sede: Sede=new Sede();

  constructor(
    public _sedeService: SedesService,
    public _deptoService: DepartamentoService,
    public _provinciaService:ProvinciasService,
    public _distritoService: DistritoService
  ) { }

  ngOnInit() {
    this.cargarDepartamento();
    this.cargarSede();
  }

  cargarSede(){
    this._sedeService.cargarSedes()
        .subscribe((resp:any)=>{
          this.sedes=resp.sede;
        });
  }
  cargarDepartamento(){
    this._deptoService.cargarDepartamentos()
        .subscribe(departamentos=>{
          this.departamentos=departamentos;
        });
  }

  cambioDepartamento(departamento){
    this._provinciaService.listaProvDepto(departamento)
        .subscribe(provincias=>this.provincias=provincias);
  }
  cambioProvincia(provincia){
    this._distritoService.listaDistProv(provincia)
        .subscribe(distritos=>this.distritos=distritos);
  }

  guardarSede(f: NgForm){
    if(f.invalid){
      return;
    }
    this._sedeService.guardarSede(this.sede)
        .subscribe(sede=>{
          this.sede._id=sede._id;
          this.cargarSede();
        });
  }

  cambioDistrito(evento){

  }
}
