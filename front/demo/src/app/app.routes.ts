import { Routes } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";
import { EventsComponent } from "./events/events.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { AuthenticationComponent } from "./authentication/authentication.component";

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent, title: 'Мероприятия' },
  { path: 'events/:eventId', component: EventDetailComponent, title: 'Детали мероприятия' },
  { path: 'profile', component: ProfileComponent, title: 'Профиль' },
  { path: 'auth', component: AuthenticationComponent, title: 'Аутентификация' },
];
