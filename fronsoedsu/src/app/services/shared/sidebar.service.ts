import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RXJS', url: '/rxjs' }
      ]
    },
    {
      titulo:'Caja',
      icono:'mdi mdi-security-home',
      submenu:[
          {titulo:'Escalas',url:'/escala'},
          {titulo:'Conceptos',url:'/concepto'},
          {titulo:'Escalas por Carrera', url:'/escalaCarrera'},
          {titulo: 'Ctas de Estudiantes',url:'/ctaCorriente'},
          {titulo:'Config. Fecha Venc Deudas', url: '/fechaVencimiento'},
        ]
    },
    {
      titulo:'Seguridad',
      icono:'mdi mdi-security-home',
      submenu:[
        {titulo:'usuario',url:'/usuarios'}
        
      ]
    },
    {
      titulo:'Configuración',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Periodo', url:'/periodo'},
        {titulo:'Departamento',url:'/departamentos'},
        {titulo:'Provincia',url:'/provincias'},
        {titulo:'Distrito',url:'/distritos'},
        {titulo:'Estado', url:'/estados'},
        {titulo:'Sede', url:'/sedes'},
        {titulo:'Personas',url:'/personas'},
        {titulo:'Tipo Carrera Profesional', url:'/tipoCarrera'}
      ]
    },
    {
      titulo:'Programación Académica',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Horario', url:'/horario'},
        {titulo:'Ambientes', url:'/ambientes'},
        {titulo:'Tipo Asignatura', url:'/tipoAsignatura'},
        {titulo:'Asignaturas', url:'/asignatura'}
      ]
    },
    {
      titulo:'Registros Académicos',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Estados para Estudiantes',url:'/tipoEstudiante'},
        {titulo:'Estudiantes',url:'/estudiante'},
        {titulo:'Escuela Académica Profesional', url:'/carrera'},
        {titulo:'Planes de Estudios', url:'/planEstudio'},
        {titulo:'Configurar Asignatura Carrera',url:'/carreraAsignatura'}
      ]
    }
  ];

  constructor() { }

}
