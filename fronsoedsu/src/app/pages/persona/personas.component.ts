import { Component, OnInit } from '@angular/core';
import { DepartamentoService, ProvinciasService, DistritoService, PersonasService, SexoService } from 'src/app/services/service.index';
import { Departamento } from '../../models/departamento';
import { Provincia } from '../../models/provincia';
import { Distrito } from '../../models/distrito';
import { NgForm } from '@angular/forms';
import { Persona } from '../../models/persona';
import { Sexo } from '../../models/sexo';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

  departamentos: Departamento[]=[];
  provincias: Provincia[]=[];
  distritos: Distrito[]=[];
  sexos: Sexo[]=[];
  depts: Departamento[]=[];
  provs: Provincia[]=[];
  dists: Distrito[]=[];

  persona:Persona=new Persona();

  constructor(
    public _departamentoService: DepartamentoService,
    public _provinciaService:ProvinciasService,
    public _distritoService: DistritoService,
    public _personaService: PersonasService,
    public _sexoService:SexoService
  ) { }

  ngOnInit() {
    this.cargarDepartamento();
    this.cargarDepartamentoDir();
  }

 
  cargarDepartamento(){
    this._departamentoService.cargarDepartamentos()
        .subscribe(departamentos=>{
          this.departamentos=departamentos;
        });
  }

  cargarDepartamentoDir(){
    this._departamentoService.cargarDepartamentos()
        .subscribe(departamentos=>{
          this.depts=departamentos;
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
  cambioDistrito(evento){

  }

  cambioDepartamentoDir(departamento){
    this._provinciaService.listaProvDepto(departamento)
    .subscribe(provincias=>this.provs=provincias);
  }
  cambioProvinciaDir(provincia){
    this._distritoService.listaDistProv(provincia)
        .subscribe(distritos=>this.dists=distritos);
  }
  cambioDistritoDir(evento){

  }

  guardarPersona(f: NgForm){
    if(f.invalid){
      return;
    }
    this._personaService.guardarPersona(this.persona)
        .subscribe(persona=>{
          this.persona._id=persona._id;
        });
  }

}
