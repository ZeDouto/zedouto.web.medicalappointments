import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    url = "https://medicalappointments-api-beta.azurewebsites.net/dashboard/v1/login";

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user: User) {

        return this.http.post<User>(this.url, user, this.httpOptions)
            .pipe(map(user => {
                if (user && user.crm) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}