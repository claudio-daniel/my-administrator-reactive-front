import { INQUILINOS } from './inquilino.json';
import { Inquilino } from './inquilino';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { InquilinosComponent } from './inquilinos.component.js';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  private urlEndPointListar : string = "http://localhost:8080/inquilino/listarInquilinos";
  private urlEndPointCrear : string = "http://localhost:8080/inquilino/form";
  private urlEndPointVer : string = "http://localhost:8080/inquilino/verInquilino";
  private urlEndPointEliminar : string = "http://localhost:8080/inquilino/eliminar";
  
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http : HttpClient, private route : Router) { }

  getInquilinos(): Observable<Inquilino[]>{
    
    return this.http.get(this.urlEndPointListar).pipe(
      map(response => {
        let inquilinos = response as Inquilino[]

        return inquilinos.map( inquilino => {
          inquilino.nombre = inquilino.nombre.toUpperCase();

          return inquilino;
        })
      })
    );
  }

  crearInquilino(inquilino : Inquilino): Observable<any>{
    return this.http.post<Inquilino>(this.urlEndPointCrear, inquilino, {headers : this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getInquilino(id): Observable<Inquilino>{
    
    return this.http.get<Inquilino>(`${this.urlEndPointVer}/${id}`).pipe(
      catchError(e =>{
        this.route.navigate(['/inquilinos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  actualizarInquilino(inquilino : Inquilino): Observable<any>{
    
    return this.http.put<Inquilino>(`${this.urlEndPointCrear}/${inquilino.id}`, inquilino , {headers : this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  eliminarCliente(id : number): Observable<any>{
    return this.http.delete<Inquilino>(`${this.urlEndPointEliminar}/${id}` , {headers : this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
