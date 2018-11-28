import { Component, OnInit } from '@angular/core';
import { CarreraService, PeriodoService, SedesService, 
  EstadoService, TipoEstudianteService, PersonasService, EstudianteService } from 'src/app/services/service.index';
import { Carrera } from '../../models/carrera';
import { Periodo } from '../../models/periodo.model';
import { Sede } from '../../models/sede';
import { Estado } from '../../models/estado';
import { TipoEstudiante } from '../../models/tipoEstudiante';
import { Estudiante } from '../../models/estudiante';
import { Persona } from '../../models/persona';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: []
})
export class EstudiantesComponent implements OnInit {

  carreras:Carrera[]=[];
  periodos:Periodo[]=[];
  sedes: Sede[]=[];
  estados:Estado[]=[];
  tipoEstudiantes:TipoEstudiante[]=[];
  estudiante:Estudiante=new Estudiante('','');
  personas:Persona[]=[];
  estudiantes: Estudiante[]=[];
  detalleRegistro: any={};
  usuarioExiste: boolean=false;

  constructor(
    public _carreraService: CarreraService,
    public _periodoService: PeriodoService,
    public _sedeService: SedesService,
    public _estadoService: EstadoService,
    public _tipoEstudianteService: TipoEstudianteService,
    public _personaService: PersonasService,
    public _estudianteService: EstudianteService,
    public activitedRoute: ActivatedRoute,
    public router: Router
  ) 
  { 
    activitedRoute.params.subscribe(params=>{
      let id=params['id'];
      if(id !=='nuevo'){
        this.buscarEstudiante(id);
      }
    });
  }

  ngOnInit() {
    this.cargarCarrera();
    this.cargarEstado();
    this.cargarPeriodo();
    this.cargarSede();
    this.cargarTipoEstudiante();
  }

  cargarCarrera(){
    this._carreraService.cargarCarrera()
        .subscribe((resp:any)=>{
          this.carreras=resp.carrera;
        });
  }
  cargarPeriodo(){
    this._periodoService.cargarPeriodos()
        .subscribe((resp:any)=>{
          this.periodos=resp.periodo;
        });
  }
  cargarSede(){
    this._sedeService.cargarSedes()
        .subscribe((resp:any)=>{
          this.sedes=resp.sede;
        });
  }
  cargarEstado(){
    this._estadoService.cargarEstado()
        .subscribe((resp:any)=>{
          this.estados=resp.estado;
        });
  }
  cargarTipoEstudiante(){
    this._tipoEstudianteService.cargarTipoEstudiante()
        .subscribe((resp:any)=>{
          this.tipoEstudiantes=resp.tipoEstudiante;
        });
  }

  cambiarCarrera(evento){
    
  }
  cambiarEstado(evento){
    
  }
  cambiarPeriodo(evento){
    
  }
  cambiarSede(evento){
    
  }
  cambiarTipoEstudiante(evento){
    
  }

  buscarEstudianteDni(dni: string){
    // console.log(dni);
    this._estudianteService.estudianteCodigo(dni)
        .subscribe((resp:any)=>{
          // console.log(resp);
          console.log(resp.estudiante);
          if(resp.estudiante.length === 0 ){
            this._personaService.buscarPersonaDni(dni)
                .subscribe((person:any)=>{
                  console.log(person);
                  this.personas=person.persona;
                  if(person.persona.length===0){
                    console.log('No exites la persona');
                    return;
                  }
                  else{
                    // this.detalleRegistro=person.persona[0];
                    this.detalleRegistro={
                      persona:person.persona[0]._id,
                      _id: person.persona[0]._id,
                      alias: person.persona[0].alias,
                      nroDocumento: person.persona[0].nroDocumento,
                    };
                    this.usuarioExiste=false;
                  }
                });
            return;
          }
          else{
            // console.log(resp.estudiante[0]);
            this.detalleRegistro={
              // codigo: resp.estudiante[0].codigo,
              _id: resp.estudiante[0]._id,
              alias: resp.estudiante[0].nombre,
              persona: resp.estudiante[0].persona,
              nombre:resp.estudiante[0].nombre,
              nroDocumento: resp.estudiante[0].codigo,
              sede: resp.estudiante[0].sede,
              periodo: resp.estudiante[0].periodo,
              tipoEstudiante: resp.estudiante[0].tipoEstudiante,
              carrera: resp.estudiante[0].carrera,
              estado: resp.estudiante[0].estado
            };
            if(this.detalleRegistro){
              this.usuarioExiste=false;  
              return;
            }
            // this.usuarioExiste=true;
            console.log(this.detalleRegistro);
          }
          
        })
  }

  guardarPersona(f: NgForm){
    // console.log(this.detalleRegistro);
    if(f.invalid)return;
    this._estudianteService.guardarEstudiante(this.detalleRegistro)
        .subscribe();
  }
  buscarEstudiante(id: string){
    this._estudianteService.buscarEstudiante(id)
        .subscribe((resp: any)=>{
          // this.estudiante=estudiante;
          // this.estudiante.carrera=estudiante.carrera._id;
          // this.estudiante.estado=estudiante.estado._id;
          // this.estudiante.periodo=estudiante.periodo._id;
          // this.estudiante.sede=estudiante.sede._id;
          // this.estudiante.persona=estudiante.persona._id;
          // console.log(resp);
          this.detalleRegistro={
            // codigo: resp.estudiante._id,
            _id: resp.estudiante._id,
            alias: resp.estudiante.nombre,
            nroDocumento: resp.estudiante.codigo,
            persona:resp.estudiante.persona,
            sede: resp.estudiante.sede,
            periodo: resp.estudiante.periodo,
            tipoEstudiante: resp.estudiante.tipoEstudiante,
            carrera: resp.estudiante.carrera,
            estado: resp.estudiante.estado
          };
          console.log(this.detalleRegistro);
        });
  }

}
