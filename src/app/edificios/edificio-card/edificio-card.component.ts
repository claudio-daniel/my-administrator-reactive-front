import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Edificio } from '../edificio';

@Component({
  selector: 'app-edificio-card',
  templateUrl: './edificio-card.component.html',
  styleUrls: ['./edificio-card.component.css']
})
export class EdificioCardComponent implements OnInit {

  @Input() edificio: Edificio;
  @Output() edificioSeleccionado: EventEmitter<boolean>;

  constructor() { 
    this.edificioSeleccionado = new EventEmitter();
  }

  ngOnInit() {
  }

  ocultarEdificio(){
    this.edificio = null;
    this.edificioSeleccionado.emit(false);
  }

}
