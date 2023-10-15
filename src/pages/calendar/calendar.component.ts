import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';



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
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;
  constructor(private cookieService: CookieService,
    private apiService: ApiService) {

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
        //console.log(JSON.stringify(data));
        // Assurez-vous que chaque objet a des propriétés `start` et `title`.
        this.events = data.map((event: any) => {
          const eventDate = new Date(event.date + 'Z');
          console.log(eventDate);



          //modification du start
          const yourDateStart = new Date(event.date + 'Z');
          yourDateStart.setHours(8, 0, 0, 0);
          let start = new Date(yourDateStart);

          let hours = yourDateStart.getHours();
          let minutes = yourDateStart.getMinutes();
          // Si vous voulez afficher l'heure sous la forme "08:00" avec les zéros au début pour les heures ou les minutes inférieures à 10
          let timeStringStart = (hours).toString().padStart(2, '0') + ':' +
            (minutes).toString().padStart(2, '0');
          console.log(timeStringStart); // affiche 8:00

          //modification du end
          const yourDateEnd = new Date(event.date + 'Z');
          yourDateEnd.setHours(12, 0, 0, 0);
          console.log(yourDateEnd);
          let end = new Date(yourDateEnd + 'Z');
          let hoursEnd = yourDateEnd.getHours();
          let minutesEnd = yourDateEnd.getMinutes();

          // Si vous voulez afficher l'heure sous la forme "12:00" avec les zéros au début pour les heures ou les minutes inférieures à 10
          let timeStringEnd = (hoursEnd).toString().padStart(2, '0') + ':' +
            (minutesEnd).toString().padStart(2, '0');
          console.log(timeStringEnd); // affiche 12:00

          if (event.titleEvent === 'Collecte alimentaire') {
            // créer les objets Date pour le début et la fin
            start = new Date(yourDateStart);
            const [heureStart, minuteStart] = event.participant[0].heureStart.split(':');
            start.setHours(heureStart, minuteStart);  // heure, minute
            end = new Date(yourDateStart);
            const [heureEnd, minuteEnd] = event.participant[0].heureEnd.split(':');
            end.setHours(heureEnd, minuteEnd);  // heure, minute



            // Pour chaque participant
            event.participant.forEach((participant: any) => {

              // Assurez-vous que les heures sont définies
              if (participant.heureStart && participant.heureEnd) {
                let participantStart = new Date(yourDateStart);
                const [heureStart, minuteStart] = participant.heureStart.split(':');
                participantStart.setHours(heureStart, minuteStart);  // heure, minute
                let participantEnd = new Date(yourDateStart);
                const [heureEnd, minuteEnd] = participant.heureEnd.split(':');
                participantEnd.setHours(heureEnd, minuteEnd);  // heure, minute
                console.log("toto");

                console.log('participantStart', participantStart);
                console.log('participationEnd', participantStart);
                console.log('start', start);
                console.log('end', end);




                // Pour chaque participant, vérifier si heureStart est antérieure à start
                if (participantStart < start) {
                  // remplacer start par heureStart du participant
                  start = new Date(participantStart);
                }
                // pour chaque participant, vérifier si heureEnd est supérieure à end
                if (participantEnd > end) {
                  end = new Date(participantEnd);
                }


              }
            });
          }
          // Construisez une chaîne avec les noms des participants
          let participantsStr = '';
          if (event.participant && event.participant.length > 0) {
            const participantNames = event.participant.map((participant: Participant) => {
              let firstName = participant.firstName;
              if (participant.heureStart && participant.heureEnd) {
                firstName += ' (' + participant.heureStart + '-' + participant.heureEnd + ')';
              }
              return firstName
            });
            participantsStr = ` (Nombre de participant :${participantNames.length}) - ${participantNames.join(', ')}`;
          }
          const newEvent = {
            title: `${event.titleEvent}${participantsStr}`, // utiliser la propriété 'titleEvent' pour le titre
            start: start,  // utiliser l'objet Date de début modifié
            end: end,  // utiliser l'objet Date de fin modifié

          };
          console.log(newEvent);

          return newEvent
        });

        console.log(this.events);
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
