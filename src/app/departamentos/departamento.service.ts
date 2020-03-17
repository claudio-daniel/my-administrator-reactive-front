import { Departamento } from './departamento';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private urlEndPoint = 'http://localhost:8081/my_administration/departaments';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http : HttpClient, private route : Router) { }

  getDepartamentos(): Observable<Departamento[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let departamentos = response['departamentos'] as Departamento[]

        return departamentos.map( departamento => {
          departamento.nombre = departamento.nombre.toUpperCase();
          departamento.inquilino = departamento.inquilino != null ? departamento.inquilino['nombre'] : 'Disponible';
          departamento.propietario = departamento.propietario['nombre'];
          return departamento;
        })
      })
    );
  }

  //crearInquilino(inquilino : Inquilino): Observable<any>{
  //  return this.http.post<Inquilino>(this.urlEndPointCrear, inquilino, {headers : this.httpHeaders}).pipe(
  //    catchError(e =>{
  //      if(e.status == 400){
  //        return throwError(e);
  //      }
  //      console.error(e.error.mensaje);
  //      swal.fire(e.error.mensaje, e.error.error, 'error');
  //      return throwError(e);
  //    })
  //  );
  //}

  getDepartamento(id: number): Observable<Departamento>{
    
    return this.http.get<Departamento>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.route.navigate(['/departamentos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
     })
    );
  }

  buscarDepartamento(termino: string) {
    let departamentos: Departamento[] 
    //= this.getDepartamentos().subscribe(
      //json => departamentos = json
    //);
    let departamentosArr: Departamento[] = [];
    termino = termino.toLowerCase();

    for(let departamento of departamentos ){
      let nombre = departamento.nombre.toLowerCase();
      if(nombre.indexOf( termino ) >= 0 ){
        departamentosArr.push( departamento );
      }
    }

    return departamentosArr;

  }

//  actualizarInquilino(inquilino : Inquilino): Observable<any>{
    
//    return this.http.put<Inquilino>(`${this.urlEndPointCrear}/${inquilino.id}`, inquilino , {headers : this.httpHeaders}).pipe(
//      catchError(e =>{
//        if(e.status == 400){
//          return throwError(e);
//        }
//        console.error(e.error.mensaje);
//        swal.fire('Error al actualizar', e.error.mensaje, 'error');
//        return throwError(e);
//      })
//    );
//  }

//  eliminarCliente(id : number): Observable<any>{
//    return this.http.delete<Inquilino>(`${this.urlEndPointEliminar}/${id}` , {headers : this.httpHeaders}).pipe(
//      catchError(e =>{
//        console.error(e.error.mensaje);
//        swal.fire('Error al eliminar', e.error.mensaje, 'error');
//        return throwError(e);
//      })
//    );
//  }


}
