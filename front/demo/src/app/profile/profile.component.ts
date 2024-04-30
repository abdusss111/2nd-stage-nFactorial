import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";
import { Event, User } from "../models"
import {EventsService} from "../events.service";
import {AuthService} from "../google.calendar.service";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  events_by_user!: Event[];

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }
  ngOnInit(){
    const fragment = String(this.route.snapshot.fragment);
    if (fragment) {
      const tokenMatch = fragment.match(/access_token=([^&]+)/);
      if (tokenMatch) {
        const accessToken = tokenMatch[1];
        localStorage.setItem("access_token", accessToken);
        console.log('Access Token:', accessToken);
      }
    }
    const username = localStorage.getItem('username');
    if (username) {
      this.getEvents(username);
    }
  }
  getEvents(username: string){
    this.eventService.get_event_by_user(username)
      .subscribe((data)=>{
        this.events_by_user = data
      })
  }

  onAuthenticate(): void {
    this.authService.authenticate().subscribe(() => {
      console.log('Аутентификация прошла успешно!');
    }, (error) => {
      console.error('Ошибка при аутентификации:', error);
    });
  }

  protected readonly localStorage = localStorage;
}
