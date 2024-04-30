import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EventsService } from "../events.service";
import { Event } from "../models"
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events!: Event[]
  newEventTitle: string = '';
  newEventDescription: string = '';
  newEventDate!: Date;
  newEventImageUrl: string = '';
  newEventPlaces!: number;
  newEventTime: string = '';
  newEventLocation: string = '';

  ngOnInit(){
    this.event_list()
  }

  constructor(private eventsService: EventsService) {
  }

  event_list(){
    this.eventsService
      .event_list()
      .subscribe((data) => {
        this.events = data
      })
  }

  newEvent() {
    if (this.newEventLocation=='' || this.newEventTitle=='' || this.newEventDescription=='' || this.newEventImageUrl==''){
      alert("Заполните все поля!")
    }
    else{
      const eventData = {
        title: this.newEventTitle,
        description: this.newEventDescription,
        date: this.newEventDate,
        imageUrl: this.newEventImageUrl,
        places: this.newEventPlaces,
        time: this.newEventTime,
        location: this.newEventLocation
      }
      this.eventsService.post_event(eventData).subscribe((data)=>{})
    }
}
  protected readonly localStorage = localStorage;
}
