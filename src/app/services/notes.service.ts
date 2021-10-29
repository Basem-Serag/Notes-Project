import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseUrl: string = 'https://routeegypt.herokuapp.com/';
  constructor(private _HttpClient: HttpClient) {}

  getUserNotes(req: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'getUserNotes', req);
  }

  addNote(req: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'addNote', req);
  }

  updateNote(req: object): Observable<any> {
    return this._HttpClient.put(this.baseUrl + 'updateNote', req);
  }
  deletedNote(req: any): Observable<any> {
    let options = {
      body: {
        NoteID: req.NoteID,
        token: req.token,
      },
    };
    return this._HttpClient.delete(this.baseUrl + 'deleteNote', options);
  }
}
