import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { DepartamentoService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: []
})
export class DepartamentosComponent implements OnInit {

  departamentos: Departamento[]=[];

  constructor(
    public _departamentoService: DepartamentoService
  ) { }

  ngOnInit() {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(){
    this._departamentoService.cargarDepartamentos()
        .subscribe(departamentos=>{
          this.departamentos=departamentos;
        });
  }
  actualizarDepartamentos(departamento: Departamento){
    this._departamentoService.actualizarDepartamento(departamento)
        .subscribe(()=>this.cargarDepartamentos());
  }
  crearDepartamento(){
    swal({
      title: 'Crear Departamento',
      text: 'Ingrese el nombre del Departamento',
      content: 'input',
      buttons: true,
      dangerMode: true
    })
    .then( (valor: string) =>{
      if(!valor || valor.length<=0) return;
      this._departamentoService.crearDepartamento( valor ).subscribe(()=>this.cargarDepartamentos());
    });
  }
  buscarDepto(termino: string){
    if(termino.length<=0){
      this.cargarDepartamentos();
      return;
    }
    this._departamentoService.buscarDepartamento(termino).subscribe(departamentos=>this.departamentos=departamentos);
  }
  borrarDepartamento(departamento: Departamento){
    this._departamentoService.eliminarDepartamento(departamento._id).subscribe(()=>this.cargarDepartamentos());
  }
}
