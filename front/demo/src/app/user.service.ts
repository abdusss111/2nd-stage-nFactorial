import { Injectable } from '@angular/core';
import {Event, User, Token} from './models';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = 'http://localhost:8000/api';

  constructor(private client: HttpClient) { }

  signIn(username: string, password: string): Observable<Token> {
    return this.client.post<Token>(
      `${this.BASE_URL}/login/`,
      {username, password}
    )
  }
  user_detail(username: string): Observable<User>{
    return this.client.get<User>(`${this.BASE_URL}/users/${username}/`);
  }

  addUser(taskData: any): Observable<User> {
    return this.client.post<User>(`${this.BASE_URL}/users/`, taskData);
  }



}
