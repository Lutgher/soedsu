import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService:UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.forma=new FormGroup({
      nombre: new FormControl(null , Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  registrarUsuario(){
    console.log('Forma Valida',this.forma.valid);
    console.log(this.forma.value);

    let usuario=new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
        .subscribe(resp=>this.router.navigate(['/usuario','nuevo']));
  }

}
