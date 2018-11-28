import { Component, OnInit } from '@angular/core';
import { DepartamentoService, ProvinciasService, DistritoService } from 'src/app/services/service.index';
import { Departamento } from '../../models/departamento';
import { Provincia } from '../../models/provincia';
import { Distrito } from '../../models/distrito';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distritos',
  templateUrl: './distritos.component.html',
  styles: []
})
export class DistritosComponent implements OnInit {

  departamentos: Departamento[]=[];
  provincias: Provincia[]=[];
  distrito: Distrito=new Distrito();
  provincia: Provincia=new Provincia();
  departamento: Departamento=new Departamento();
  desde: number=10;
  // depto: string;

  constructor(
    public _departamentoService: DepartamentoService,
    public _provinciaService: ProvinciasService,
    public _distritoService: DistritoService,
    public router: Router,
    public activitedRoute: ActivatedRoute
  ) { 
    activitedRoute.params.subscribe(params=>{
      let id=params['id'];
      if(id!='nuevo'){
        this.obtenerDistrito(id);
      }
    });
  }

  ngOnInit() {
    this.cargarDepartamento();
  }

  cargarDepartamento(){
    this._departamentoService.cargarDepartamentos()
        .subscribe(departamentos=>{
          this.departamentos=departamentos;
        });
  }

  obtenerProvincia(depto: string){
    this._provinciaService.listaProvDepto(depto)
        .subscribe(provincias=>this.provincias=provincias);
  }

  obtenerDistrito(id: string){
    this._distritoService.obtenerDistrito(id).subscribe(distrito=>{
      this.distrito=distrito;
      this.distrito.provincia=distrito.Provincia.id;
    });
  }
  cambioDepartamento(departamento){
    this._provinciaService.listaProvDepto(departamento)
    .subscribe(provincias=>this.provincias=provincias);
  }
  cambioProvincia(event){
    
  }
  
  guardarDistrito(f: NgForm){
    if(f.invalid){
      return;
    }
    // const ggg={
    //   distrito: this.distrito,
    //   provincia: this.provincia
    // }
    this._distritoService.guardarDistrito(this.distrito)
        .subscribe(distrito=>{
          // console.log(distrito);
          this.distrito._id=distrito._id;
          // this.router.navigate(['/distrito', distrito._id]);
        });
  }

}
