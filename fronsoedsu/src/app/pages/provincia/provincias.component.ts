import { Component, OnInit } from '@angular/core';
import { DepartamentoService, ProvinciasService } from 'src/app/services/service.index';
import { Departamento } from '../../models/departamento';
import { NgForm } from '@angular/forms';
import { Provincia } from '../../models/provincia';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styles: []
})
export class ProvinciasComponent implements OnInit {

  departamentos: Departamento[]=[];
  provincia: Provincia=new Provincia('','');
  // desde: number=0;
  // totalProvincias: number=0;

  constructor(
    public _departamentoService: DepartamentoService,
    public _provinciaService: ProvinciasService,
    public router: Router,
    public activitedRoute: ActivatedRoute
  ) { 

    activitedRoute.params.subscribe(params=>{
      let id=params['id'];
      if(id !== 'nuevo'){
        this.obtenerProvincia(id);
      }
    });

  }

  ngOnInit() {
    this._departamentoService.cargarDepartamentos().subscribe(departamentos=>this.departamentos=departamentos);
  }

  obtenerProvincia(id: string){
    this._provinciaService.obtenerProvincia(id)
        .subscribe(provincia=>{
          // console.log(provincia);
          this.provincia=provincia;
          this.provincia.departamento=provincia.departamento._id;
        });
  }
  guardarProvincia( f: NgForm){
    if(f.invalid){
      return;
    }
    this._provinciaService.guardarProvincia(this.provincia)
        .subscribe(provincia=>{
          // console.log(provincia);
          this.provincia._id=provincia._id;
          this.router.navigate(['/provincia',provincia._id]);
        });
  }

  cambioDepartamento( event ){
    // console.log(event);
  }

}
