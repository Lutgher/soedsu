
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  PeriodoService,
  DepartamentoService,
  ProvinciasService,
  EstadoService,
  PersonasService,
  TipoAsignaturaService,
  SedesService,
  AmbienteService,
  HorarioService,
  CarreraService,
  AsignaturaService,
  CarreraAsignaturaService,
  EscalaService,
  ConceptosService,
  EscalaCarrerasService,
  SexoService,
  EstudianteService,
  TipoEstudianteService,
  CtaCorrienteService,
  TipoCarreraService,
  FechaVencimientoService
 } from './service.index';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    PeriodoService,
    DepartamentoService,
    ProvinciasService,
    EstadoService,
    PersonasService,
    TipoAsignaturaService,
    SedesService,
    AmbienteService,
    HorarioService,
    CarreraService,
    AsignaturaService,
    CarreraAsignaturaService,
    EscalaService,
    ConceptosService,
    EscalaCarrerasService,
    SexoService,
    EstudianteService,
    TipoEstudianteService,
    CtaCorrienteService,
    TipoCarreraService,
    FechaVencimientoService
  ],
  declarations: []
})
export class ServiceModule { }
