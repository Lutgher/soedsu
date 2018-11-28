import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './login/register.component';
import { AsignaturaComponent } from './pages/asignaturas/asignatura.component';
import { CarreasComponent } from './pages/carrera/carreas.component';
import { ProvinciasComponent } from './pages/provincia/provincias.component';
import { UsuarioComponent } from './pages/usuarios/usuario.component';

import { DistritosComponent } from './pages/distrito/distritos.component';
import { EstadosComponent } from './pages/estado/estados.component';
import { PersonasComponent } from './pages/persona/personas.component';
import { TipoasignaturaComponent } from './pages/tipo-asignaturas/tipoasignatura.component';
import { AmbientesComponent } from './pages/ambiente/ambientes.component';
import { EstudiantesComponent } from './pages/estudiante/estudiantes.component';
import { CtaCorrienteComponent } from './pages/cta-corrientes/cta-corriente.component';
// import { TipoAsignaturasComponent } from './pages/tipo-asignaturas.component';
// import { PersonaComponent } from './pages/persona/persona.component';
// import { ImagenPipe } from './pipes/imagen.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RegisterComponent,
    AsignaturaComponent,
    CarreasComponent,
    ProvinciasComponent,
    UsuarioComponent,
    // PersonaComponent,
    DistritosComponent,
    EstadosComponent,
    PersonasComponent,
    TipoasignaturaComponent,
    AmbientesComponent,
    AsignaturaComponent,
    EstudiantesComponent,
    CtaCorrienteComponent
    // ImagenPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
