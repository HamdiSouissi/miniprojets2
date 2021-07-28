import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.apiUrl}/dashboard`;
  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};

    constructor(
      private http: HttpClient,
      private httpErrorHandler: HttpErrorHandler
    ) {
      this.handleError = this.httpErrorHandler.createHandleError('UsersService')
    }

    getUsers() {
      return this.http.get(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError('getUsers', null))
      )
    }


    getUsersByRole(role):Observable<User[]>{
      return  this.http.get<User[]>(`${environment.apiUrl}/infirmier/${role}`);


    }
    delete(email){
      return  this.http.delete(`${environment.apiUrl}/infirmier/${email}`);

    }
}
