import { Component, OnInit } from '@angular/core';
import { EDIFICIOS } from './edificios.mock';
import { Edificio } from './edificio';

@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {
  edificios = EDIFICIOS;
  selectedEdificio: Edificio;
  mostrarTarjeta = false;
  hero: any;
  selectedHero: any;

  constructor() { }

  ngOnInit() {
  }

  onSelect(edificio: Edificio): void {
    this.selectedEdificio = edificio;
  }

  ocultarCardEdificio(mostrar: boolean) {
    this.selectedEdificio = new Edificio;
    this.mostrarTarjeta = mostrar;
  }
}

