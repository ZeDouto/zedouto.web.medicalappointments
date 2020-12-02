import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../_models';
import { Consulta } from '../_models/consulta';


@Injectable({ providedIn: 'root' })
export class ConsultaService{
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

 url = "https://medicalappointments-api-beta.azurewebsites.net/dashboard/v1/consultas";

 httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 }

 constructor(private http: HttpClient) { }

 getId(id) {
     return this.http.get<Consulta>(this.url + '/' + id,this.httpOptions).pipe(catchError(this.handleError));
 }

 register(consulta: Consulta) {
     return this.http.post(this.url,  JSON.stringify(consulta), this.httpOptions).pipe(catchError(this.handleError));
 }

 getConsultaByPaciente(id: string) {
     return this.http.get<Consulta[]>(this.url + '/paciente/' + id, this.httpOptions).pipe(catchError(this.handleError));
 }

 getConsultaByMedico(id: number) {
  return this.http.get<Consulta[]>(this.url + '/medico/' + id, this.httpOptions).pipe(catchError(this.handleError));
}

 handleError(error: HttpErrorResponse) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
   };
}