import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../_models';
import { Paciente } from '../_models/paciente';

@Injectable({ providedIn: 'root' })
export class PacienteService{
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

 url = "https://medicalappointments-api-beta.azurewebsites.net/dashboard/v1/pacientes";

 httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 }

 constructor(private http: HttpClient) { }

 register(paciente: Paciente) {
     return this.http.post(this.url,  JSON.stringify(paciente), this.httpOptions).pipe(catchError(this.handleError));
 }

 get(cpf: string) {
  return this.http.get<Paciente>(this.url + '/' + cpf, this.httpOptions).pipe(catchError(this.handleError));
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