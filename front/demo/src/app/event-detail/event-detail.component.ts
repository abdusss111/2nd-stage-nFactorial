import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EventsService } from "../events.service";
import { Event } from "../models"
import { AuthService } from "../google.calendar.service";
@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event!: Event;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.event_detail()
  }
  event_detail(){
    this.route.paramMap.subscribe((params) => {
      const event_id = Number(params.get('eventId'));
      this.eventService.event_detail(event_id).subscribe((data) => {
        this.event = data;
      });
    });
  }
  register(){
    if (!this.event.participants) {
      this.event.participants = [];
    }
    if (this.event.places <= 0){
      alert("К сожалению места на данное мероприятие закончились")
    }
    else if (this.event.participants.includes(String(localStorage.getItem('username')))) {
      alert("Вы уже забронировали место на данное мероприятие! Посмотрите список своих бронирований на вкладке Мой профиль!")
    }
    else{
      this.event.places = this.event.places - 1;
      this.event.participants.push(String(localStorage.getItem('username')));

      const updEvent = {
        title: this.event.title,
        description: this.event.description,
        date: this.event.date,
        imageUrl: this.event.imageUrl,
        places: this.event.places,
        time: this.event.time,
        location: this.event.location,
        participants: this.event.participants
      }

      this.eventService.event_detail_change(updEvent, this.event.id)
        .subscribe((updEvent)=>{
          console.log('Event data updated successfully:');
          alert(`Поздавляем, Вы успешно забронировали место на ${this.event.title}!`)
        });

    }
    }

  createGoogleCalendarEvent(): void {
    const accessToken = String(localStorage.getItem("access_token")); // Предполагается, что у вас есть метод getAccessToken() в вашем AuthService

    const eventData = {
      "summary": this.event.title,
      "start": {
        "dateTime": `${this.event.date}T${this.event.time}:00`,
        "timeZone": "Asia/Almaty"
      },
      "end": {
        "dateTime": `${this.event.date}T${this.event.time}:00`,
        "timeZone": "Asia/Almaty"
      }
    };

    this.authService
      .createEvent(accessToken, eventData)
      .subscribe((response) => {
        console.log('Событие успешно создано:', response);
      },
      (error) => {
        console.error('Ошибка при создании события:', error);
      }
    );
  }

  protected readonly localStorage = localStorage;
}




