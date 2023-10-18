import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
interface Participation {
  event: string;
  date: string;
  timeStart?: string;
  timeEnd?: string;
  userId: string;
}
interface Event {
  participant: Participant[];
  titleEvent: string;
  functionalId: string;
  // autres champs ici...
}
interface Participant {
  firstName: string;
  heureStart?: string;
  heureEnd?: string;
  userId: string;
}


@Component({
  selector: 'app-inscription-event',
  templateUrl: './inscription-event.component.html',
  styleUrls: ['./inscription-event.component.scss']
})
export class InscriptionEventComponent implements OnInit {
  participantForm!: FormGroup;
  events: Event[] = [];
  userId: string = '';
  firstName: string | null = null;
  participant: Participant[] = [];
  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,  // Injectez votre service API
    private route: ActivatedRoute,
    private router: Router)
  { }

  ngOnInit() {
    //url  
    const url = this.router.url;
    console.log(url); 
// Si vous voulez juste avoir la valeur actuelle de l'URL (pas réactive)
const typeFromUrl = this.route.snapshot.queryParams['type'] ? this.route.snapshot.queryParams['type'].trim() : '';
const rawDate = this.route.snapshot.queryParams['date'];
const dateFromUrl = rawDate ? String(rawDate).split('T')[0].trim() : '';
// console.log('Type:', typeFromUrl);
// console.log('Date:', dateFromUrl);

// Si 'type' est présent dans l'URL et n'est pas null, utilisez-le comme valeur initiale pour le champ 'event'. Sinon, utilisez une chaîne vide.
const initialEventType = typeFromUrl || '';
const initialEventDate = dateFromUrl || '';
// console.log('Type from URL:', initialEventType);
// console.log('Date from URL:', initialEventDate);

//formulaire
this.participantForm = new FormGroup({
  event: new FormControl(initialEventType, Validators.required),
  date: new FormControl(initialEventDate, Validators.required),
  timeStart: new FormControl(''),
  timeEnd: new FormControl('')
});
// console.log(this.participantForm);
//  console.log(this.participantForm.value.event);
//  console.log(this.participantForm.value.date);
}

  InscriptionUser(functionalId: string, participation: Participation) {
    const token = this.cookieService.get('sessionToken');
    //console.log('Token:', token);
    //recuper dans le cookie le nom
    this.firstName = this.cookieService.get('firstName');
    if (token) {
      // Récupération des données utilisateur
      this.userId = this.cookieService.get('userId');
      // Récupération des événements
      this.apiService.getEvents(token).subscribe(
        eventsData => {
          //console.log('Events Data:', eventsData);
          // console.log('User ID:', this.userId);
          // console.log('User functionalId:', functionalId);
          // console.log(participant);

          this.events = eventsData;
          const matchingEvent = this.events.find(event => event.functionalId === functionalId);

          // Vérification de l'existence du functionalId
          if (matchingEvent) {
            console.log('Matching event found:', matchingEvent);
            // Récupération des participants
            const participants = matchingEvent.participant;
            console.log('Participants:', participants);
            // Vérification de l'existence du participant
            const matchingParticipant = participants.find(participant => participant.userId === this.userId);
            // Ajout du participant s'il n'existe pas
            if (!matchingParticipant) {
              // construction du participant
              const newParticipant: Participant = {
                firstName: this.firstName ? this.firstName : '',
                userId: this.userId,
                heureStart: participation.timeStart,
                heureEnd: participation.timeEnd
              }
              //ajout du participant
              matchingEvent.participant.push(newParticipant);
              console.log('Participant added:', matchingEvent);
              // Enregistrement de l'événement
              this.apiService.updateEvent(token, matchingEvent).subscribe(
                response => {
                  console.log('Event created successfully:', response);
                },
                error => {
                  console.log('Error creating event:', error);
                }
              );
            } else {
              alert('Vous êtes déja inscrit à cet évènement')
            }
          } else {
            console.log('No matching event found');

            // Création d'un nouvel objet event avec les données du formulaire et du userId
            const newEvent = {
              DescriptionEvent: participation.event,
              titleEvent: participation.event,
              date: participation.date,
              participant: [{ userId: this.userId, firstName: this.firstName, heureStart: participation.timeStart ? participation.timeStart : '', heureEnd: participation.timeEnd ? participation.timeEnd : '' }],
              functionalId: participation.event + '-' + participation.date
            };

            console.log('New Event:', newEvent);

            // Logique pour sauvegarder `newEvent` avec l'API
            this.apiService.postNewEvent(token, newEvent).subscribe(
              response => {
                console.log('Event created successfully:', response);
              },
              error => {
                console.log('Error creating event:', error);
              }
            );
          }
        },
        error => console.log('Events Error:', error)
      );

    }
    return false;
  }


  onSubmit() {


    if (this.participantForm.valid) {
      const participation: Participation = this.participantForm.value;
      //construction functionalId
      const functionalId = `${participation.event}-${participation.date}`;

      console.log('Constructed functionalId:', functionalId);

      // Check if user is already a participant
      this.InscriptionUser(functionalId, participation)
       // Naviguer vers la route home
       this.router.navigate(['/home']);
    } else {
      console.log('Invalid form');
    }
  }

}
