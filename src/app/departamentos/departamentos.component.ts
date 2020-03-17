import { Component, OnInit } from '@angular/core';
import { Departamento } from './departamento';
import { DepartamentoService} from './departamento.service'

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  imagen = false;
  departamentos: Departamento[] = [];

  constructor( private departamentoService: DepartamentoService ) { }

  ngOnInit() {
    this.departamentoService.getDepartamentos().subscribe(
      departamentos => this.departamentos = departamentos
    );
  }
}
