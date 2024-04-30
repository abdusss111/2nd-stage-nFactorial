import { Injectable } from '@angular/core';
import { Event } from './models';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  BASE_URL: string = 'http://localhost:8000/api';
  constructor(private client: HttpClient) { }

  event_list(): Observable<Event[]>{
    return this.client.get<Event[]>(`${this.BASE_URL}/events/`);
  }

  event_detail(event_id: number): Observable<Event>{
    return this.client.get<Event>(`${this.BASE_URL}/events/${event_id}/`);
  }

  event_detail_change(eventData: any, event_id: number): Observable<Event> {
    return this.client.put<Event>(`${this.BASE_URL}/events/${event_id}/`, eventData);
  }

  post_event(eventData: any): Observable<Event> {
    return this.client.post<Event>(`${this.BASE_URL}/events/`, eventData);
  }
  get_event_by_user(username: string): Observable<Event[]> {
    return this.client.get<Event[]>(`${this.BASE_URL}/users/${username}/events/`)
  }

}
