import { Component, OnInit, Input } from '@angular/core';
import { Departamento } from '../departamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento-card',
  templateUrl: './departamento-card.component.html',
  styleUrls: ['./departamento-card.component.css']
})
export class DepartamentoCardComponent implements OnInit {

  @Input() departamento: any = {};

  constructor( private router: Router) { }

  ngOnInit() {
  }

  verMas(index: number) {
    this.router.navigate(['/departamento', this.departamento.id]);
  }
}
