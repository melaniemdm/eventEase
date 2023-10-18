import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { getISOWeek, isSameDay, isSameMonth } from 'date-fns';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

interface ExtendedCalendarEvent extends CalendarEvent {
  type?: string;
}

interface Participant {
  firstName: string;
  userId: string;
  heureStart?: string;
  heureEnd?: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {
  constructor(private cookieService: CookieService,
    private apiService: ApiService,
    private router: Router) {
    
  }
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  events: ExtendedCalendarEvent[] = [];
  activeDayIsOpen = false;
// au click de la date, redirection vers la page d'inscription dayClicked
  
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
        this.events = data.map((event: any) => {
          const eventDate = new Date(event.date + 'Z');
    
          // Initialisation de start et end
          let start = new Date(event.date + 'Z');
          start.setHours(8, 0, 0, 0);
    
          let end = new Date(event.date + 'Z');
          end.setHours(12, 0, 0, 0);
    
          if (event.titleEvent === 'Collecte alimentaire') {
            event.participant.forEach((participant: any) => {
              if (participant.heureStart && participant.heureEnd) {
                const participantStart = new Date(eventDate);
                const [heureStart, minuteStart] = participant.heureStart.split(':');
                participantStart.setHours(+heureStart, +minuteStart);
    
                const participantEnd = new Date(eventDate);
                const [heureEnd, minuteEnd] = participant.heureEnd.split(':');
                participantEnd.setHours(+heureEnd, +minuteEnd);
    
                if (participantStart < start) {
                  start = participantStart;
                }
                if (participantEnd > end) {
                  end = participantEnd;
                }
              }
            });
          }
    
          const participantsStr = event.participant && event.participant.length > 0 ? 
            ` (Nombre de participant :${event.participant.length}) - ${event.participant.map((participant: any) => {
              let name = participant.firstName;
              if (participant.heureStart && participant.heureEnd) {
                name += ` (${participant.heureStart}-${participant.heureEnd})`;
              }
              return name;
            }).join(', ')}` : '';
    
          return {
            title: `${event.titleEvent}${participantsStr}`,
            start: start,
            end: end,
            type: event.typeEvent
          };
        });
    
        console.log(this.events);
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
    
  }
//au click envoie sur la page d'inscription
eventClicked({ event }: { event: ExtendedCalendarEvent }): void {
  console.log('Event clicked', event.title);
  const queryParams: { type?: string; date: string } = {
    date: event.start.toISOString() 
  };
  console.log(queryParams);

  
  if (event.title) {
    queryParams.type = event.title.split('(N')[0];
}
console.log(queryParams);
  this.router.navigate(['/inscription'], { queryParams });
}

emptyDayClicked(date: Date): void {
  console.log('Empty day clicked', date);
  const queryParams: { type?: string; date: string } = {
    date: date.toISOString() }
    this.router.navigate(['/inscription'], { queryParams });
}


  setView(view: CalendarView) {
    this.view = view;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Clicked', date, events);
    console.log(events);
    if(events.length === 0) {
      date.setHours(12,0);
      //create params with date cliked
           const queryParams: { type?: string; date: string } = {
        date: date.toISOString() 
      };
           
      console.log(queryParams);
    this.router.navigate(['/inscription'], { queryParams });
    }
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
        
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true
      }
      this.viewDate = date;
    }
  }


}
