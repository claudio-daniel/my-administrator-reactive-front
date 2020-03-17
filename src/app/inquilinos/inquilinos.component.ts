import { InquilinoService } from './inquilino.service';

import { Component, OnInit } from '@angular/core';
import { Inquilino } from './inquilino';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.component.html',
  styleUrls: ['./inquilinos.component.css']
})
export class InquilinosComponent implements OnInit {

  inquilinos: Inquilino[];
  inquilinoSelect: Inquilino;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'actions'];

  constructor(private inquilinoService: InquilinoService,
              private route: Router) { }

  ngOnInit() {
    this.inquilinoService.getInquilinos().subscribe(
      inquilinos => this.inquilinos = inquilinos
    );
  }

  eliminar(inquilino: Inquilino) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿está seguro?',
      text: `se eliminaran los datos del inquilino ${inquilino.nombre} ${inquilino.apellido}!` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.inquilinos = this.inquilinos.filter(i => i !== inquilino);
        this.inquilinoService.eliminarCliente(inquilino.id).subscribe(
          response => swalWithBootstrapButtons.fire(
            'Inquilino eliminado!',
            `el inquilino ${inquilino.nombre} ${inquilino.apellido} ha sido eliminado!`,
            'success')
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `el inquilino ${inquilino.nombre} ${inquilino.apellido} permanece registrado :)`, 
          'error');
        }
    });
  }

  onSelect(inquilino: Inquilino){
    this.route.navigate(['/inquilinos/form', inquilino.id]);
  }
}
