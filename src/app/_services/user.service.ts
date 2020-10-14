import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { __param } from 'tslib';

@Injectable({ providedIn: 'root' })
export class UserService {

    url = "https://medicalappointments-api-beta.azurewebsites.net/dashboard/v1/login";

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(this.url,  JSON.stringify(user), this.httpOptions).pipe(catchError(this.handleError));
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
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