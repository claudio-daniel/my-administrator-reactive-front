import { InquilinoService } from './../inquilino.service';
import { Inquilino } from './../inquilino';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private inquilino: Inquilino = new Inquilino();
  private titulo: string ;
  private errores: string[] = [];
  constructor(private inquilinoService: InquilinoService, private route : Router, private activateRoute : ActivatedRoute) { }

  ngOnInit() {
    this.cargarInquilino();
  }

  public cargarInquilino(): void {
    this.activateRoute.params.subscribe( params => {
      let id = params[`id`];
      if (id) {
        this.titulo = 'Editando Inquilin@'
        this.inquilinoService.getInquilino(id).subscribe ( (inquilino) => this.inquilino = inquilino)
      } else{
        this.titulo = 'Creando Inquilin@';
      }
    });

  }
  public crear() : void {
    this.inquilinoService.crearInquilino(this.inquilino).subscribe(
      json => {

        this.route.navigate(['/inquilinos']);
        swal.fire('Inquilino Registrado', `inquilino ${json.inquilino.nombre} creado con éxito`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo de error : ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public actualizar() : void {
    this.inquilinoService.actualizarInquilino(this.inquilino).subscribe(
      json=> {
        this.route.navigate(['/inquilinos']);
        swal.fire('Inquilino Actualizado', `inquilino ${json.inquilino.nombre} actualizado con exito`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo de error : ' + err.status);
        console.error(err.error.errors);
      }

    )
  }
}
