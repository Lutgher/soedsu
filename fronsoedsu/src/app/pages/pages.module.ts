
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//pipe module
import { PipesModule } from '../pipes/pipes.module';
// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { DistritoComponent } from './distrito/distrito.component';
import { EstadoComponent } from './estado/estado.component';
import { CarreraComponent } from './carrera/carrera.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { PersonaComponent } from './persona/persona.component';
import { TipoAsignaturasComponent } from './tipo-asignaturas/tipo-asignaturas.component';
import { SedesComponent } from './sedes/sedes.component';
import { HorarioComponent } from './horario/horario.component';
import { PlanEstudiosComponent } from './plan-estudios/plan-estudios.component';
import { CarreraAsignaturaComponent } from './carrera-asignatura/carrera-asignatura.component';
import { EscalasComponent } from './escalas/escalas.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { EscalaCarrerasComponent } from './escala-carreras/escala-carreras.component';
import { TipoEstudianteComponent } from './tipo-estudiante/tipo-estudiante.component';
import { CtaCorrientesComponent } from './cta-corrientes/cta-corrientes.component';
import { TipoCarreraComponent } from './tipo-carrera/tipo-carrera.component';
import { FechaVencimientoComponent } from './fecha-vencimiento/fecha-vencimiento.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        PeriodoComponent,
        DepartamentosComponent,
        ProvinciaComponent,
        DistritoComponent,
        EstadoComponent,
        CarreraComponent,
        AmbienteComponent,
        PersonaComponent,
        EstudianteComponent,
        AsignaturasComponent,
        TipoAsignaturasComponent,
        SedesComponent,
        HorarioComponent,
        PlanEstudiosComponent,
        CarreraAsignaturaComponent,
        EscalasComponent,
        ConceptosComponent,
        EscalaCarrerasComponent,
        TipoEstudianteComponent,
        CtaCorrientesComponent,
        TipoCarreraComponent,
        FechaVencimientoComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule { }
