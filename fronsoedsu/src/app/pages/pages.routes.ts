import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { DistritoComponent } from './distrito/distrito.component';
import { EstadoComponent } from './estado/estado.component';
import { ProvinciasComponent } from './provincia/provincias.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { DistritosComponent } from './distrito/distritos.component';
import { EstadosComponent } from './estado/estados.component';
import { PersonaComponent } from './persona/persona.component';
import { PersonasComponent } from './persona/personas.component';
import { TipoAsignaturasComponent } from './tipo-asignaturas/tipo-asignaturas.component';
import { TipoasignaturaComponent } from './tipo-asignaturas/tipoasignatura.component';
import { SedesComponent } from './sedes/sedes.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { AmbientesComponent } from './ambiente/ambientes.component';
import { HorarioComponent } from './horario/horario.component';
import { CarreraComponent } from './carrera/carrera.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { AsignaturaComponent } from './asignaturas/asignatura.component';
import { PlanEstudiosComponent } from './plan-estudios/plan-estudios.component';
import { CarreraAsignaturaComponent } from './carrera-asignatura/carrera-asignatura.component';
import { EscalasComponent } from './escalas/escalas.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { EscalaCarrerasComponent } from './escala-carreras/escala-carreras.component';
import { TipoEstudianteComponent } from './tipo-estudiante/tipo-estudiante.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudiantesComponent } from './estudiante/estudiantes.component';
import { CtaCorrientesComponent } from './cta-corrientes/cta-corrientes.component';
import { CtaCorrienteComponent } from './cta-corrientes/cta-corriente.component';
import { TipoCarreraComponent } from './tipo-carrera/tipo-carrera.component';
import { FechaVencimientoComponent } from './fecha-vencimiento/fecha-vencimiento.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
            { path:'perfil', component: ProfileComponent, data: {titutlo: 'Perfil de usuario'}},
            //configuracion
            { path: 'periodo', component: PeriodoComponent, data: {titulo:'Periodos'}},
            { path: 'departamentos', component: DepartamentosComponent, data: {titulo:'Departamentos'}},
            { path: 'provincias', component: ProvinciaComponent, data:{titulo:'Provincias'} },
            { path: 'provincia/:id', component: ProvinciasComponent, data:{titulo:'Actualiza provincia'}},
            { path: 'distritos', component: DistritoComponent, data:{titulo: 'Distritos'}},
            { path: 'distritos/:id', component: DistritosComponent, data:{titulo: 'Actualiza Distrito'}},
            { path: 'estados', component: EstadoComponent, data:{titulo:'Estados'}},
            { path: 'estados/:id', component: EstadosComponent, data:{titulo:'Estados'}},
            { path: 'personas', component: PersonaComponent, data:{titulo: 'Personas'}},
            { path: 'personas/:id', component: PersonasComponent, data:{titulo: 'Persona'}},
            { path: 'sedes', component: SedesComponent, data:{titulo: 'Sedes'}},
            { path: 'tipoCarrera', component: TipoCarreraComponent, data:{titulo:'Tipo Carrera'}},
            //caja
            { path: 'escala', component: EscalasComponent, data:{titulo: 'Escalas'}},
            { path: 'concepto', component: ConceptosComponent, data:{titulo: 'Conceptos'}},
            { path: 'escalaCarrera', component: EscalaCarrerasComponent, data:{titulo: 'Escalas por Carrera'}},
            { path: 'fechaVencimiento', component: FechaVencimientoComponent, data: {titulo:'Configuración de Fechas de Vencimiento'}},
            { path: 'ctaCorriente', component: CtaCorrientesComponent, data:{titulo: 'Cta Corrient'}},
            { path: 'ctaCorriente/:id', component: CtaCorrienteComponent, data:{titulo:'Cta Corriente'}},
            //mantenimiento
            { path:'usuarios', component: UsuariosComponent, data:{titulo:'Mantenimiento de usuarios'}},
            { path:'usuario/:id', component: UsuarioComponent, data:{titulo:'Nuevo Usuario'}},
            //programación académica
            { path:'ambientes', component: AmbienteComponent, data:{titulo:'Ambientes'}},
            { path:'ambientes/:id', component: AmbientesComponent, data:{titulo:'Ambientes'}},
            { path:'horario', component: HorarioComponent, data:{titulo:'Programación Horas'}},
            { path:'tipoAsignatura', component: TipoAsignaturasComponent, data:{titulo:'Tipo Asignatura'}},
            { path:'tipoAsignatura/:id', component: TipoasignaturaComponent, data:{titulo:'Tipo Asignatura'}},
            { path:'asignatura', component: AsignaturasComponent, data:{titulo:'Asignaturas'}},
            { path:'asignatura/:id', component: AsignaturaComponent, data:{titulo:'Asignaturas'}},
            { path:'carreraAsignatura', component: CarreraAsignaturaComponent, data:{titulo:'Configuración de Asignaturas por Carrera'}},
            //REGISTROS
            { path:'planEstudio', component: PlanEstudiosComponent, data:{titulo:'Planes de Estudios'}},
            { path:'tipoEstudiante', component: TipoEstudianteComponent, data:{titulo:'Estado para Estudiante'}},
            { path:'estudiante', component: EstudianteComponent, data:{titulo:'Estudiante'}},
            { path:'estudiante/:id', component: EstudiantesComponent, data:{titulo:'Estudiante'}},
            { path:'carrera', component: CarreraComponent, data:{titulo:'Carrera Profesional'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
            
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
