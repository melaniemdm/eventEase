import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
viewDate:Date = new Date();
view: CalendarView= CalendarView.Week;
CalendarView=CalendarView;

events:CalendarEvent[] = [];

activeDayIsOpen = false;
constructor( private cookieService: CookieService,
  private apiService: ApiService){
  const event1 = {
    title:"Mélanie",
    start:new Date("2023-10-09T10:30"),
    end:new Date("2023-10-09T12:00"),
  }
  const event2 = {
    title:"Jordan",
    start:new Date("2023-10-09T10:30"),
    end:new Date("2023-10-09T12:00"),
  }
  this.events.push(event1,event2)
}
ngOnInit(): void {
  this.loadsEventsCalendar();
}

loadsEventsCalendar() {
  //recuperation du token 
  const token = this.cookieService.get('sessionToken');
  console.log('token', token);
  //recuperation des events dans le backend
  this.apiService.getEvents(token).subscribe(
    (data: any) => {
      console.log('Data reçue:', data);
      console.log(JSON.stringify(data));
      // Assurez-vous que chaque objet a des propriétés `start` et `title`.
      this.events = data.map((event: any) => {
        const eventDate = new Date(event.date);

        // Créer un nouvel objet Date pour le début (start) de l'événement à 00:01
        const start = new Date(eventDate);
        start.setHours(8, 0);  // heure, minute
      
        // Créer un nouvel objet Date pour la fin (end) de l'événement à 23:59
        const end = new Date(eventDate);
        end.setHours(12, 0);  // heure, minute
      
        return {
          title: event.titleEvent,  // utiliser la propriété 'titleEvent' pour le titre
          start: start,  // utiliser l'objet Date de début modifié
          end: end,  // utiliser l'objet Date de fin modifié
          // ... ajoutez ici d'autres propriétés si besoin ...
        };
      });
      console.log(this.events);
    },
    (error) => {
      console.error('Erreur lors de la récupération des événements:', error);
    }
  );
}

setView(view: CalendarView){
this.view = view;
}
dayClicked({date, events}:{date:Date; events: CalendarEvent[]}): void{
  if(isSameMonth(date, this.viewDate)){
    if(
      (isSameDay(this.viewDate, date)&& this.activeDayIsOpen === true)|| 
      events.length === 0
    ){
      this.activeDayIsOpen = false;
    }else{
      this.activeDayIsOpen = true
    }
    this.viewDate = date;
  }
}

}
