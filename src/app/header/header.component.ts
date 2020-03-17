import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: 'Mi Administrador';

  constructor() { }

  ngOnInit() {
  }

  buscar(terminoBusqueda: string){
    console.log(terminoBusqueda);
  }
}
