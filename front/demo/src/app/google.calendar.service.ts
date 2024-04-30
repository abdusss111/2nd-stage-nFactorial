import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://accounts.google.com/o/oauth2/auth';
  private clientId = '835419439096-fnlnu5883ge81964il9tp636694vqsju.apps.googleusercontent.com';
  private redirectUri = 'http://localhost:4200/profile';
  private scope = 'https://www.googleapis.com/auth/calendar';

  constructor(private http: HttpClient) { }

  authenticate(): Observable<any> {
    const authParams = {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      response_type: 'token'
    };
    const authUrl =
      `${this.authUrl}?client_id=${authParams.client_id}&redirect_uri=${authParams.redirect_uri}&scope=${authParams.scope}&response_type=${authParams.response_type}`;
    window.location.href = authUrl;
    return new Observable(observer => {
      console.log("auth successful")
    });
  }

  private apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  createEvent(accessToken: string, eventData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl, eventData, { headers: headers });
  }

}
