import { Component, OnInit } from '@angular/core';
import { CtaCorrienteService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { CtaCorriente } from '../../models/ctaCorriente';

@Component({
  selector: 'app-cta-corriente',
  templateUrl: './cta-corriente.component.html',
  styles: []
})
export class CtaCorrienteComponent implements OnInit {

  ctaCte: CtaCorriente=new CtaCorriente();

  constructor(
    public _ctaCteService: CtaCorrienteService
  ) { }

  ngOnInit() {
  }

  guardarCtaCorriente(f: NgForm){
    if(f.invalid){
      return;
    }
    this._ctaCteService.guardarCtaCorriente(this.ctaCte)
        .subscribe();
  }


}
