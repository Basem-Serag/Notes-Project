import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = 'https://routeegypt.herokuapp.com/';
  constructor(private _HttpClient: HttpClient) {}

  signUp(req: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signup', req);
  }
  signIn(req: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signin', req);
  }
  signOut(req: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signOut', req);
  }
  isClient() {
    return localStorage.getItem('TOKEN');
  } 
}
