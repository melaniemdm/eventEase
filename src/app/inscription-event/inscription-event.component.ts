import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';

interface Participant {
  event: string;
  date: string;
  timeStart?: string;
  timeEnd?: string;
  userId: string;
}
interface Event {
  participants: Participant[];
  titleEvent: string;
  functionalId: string;
  // autres champs ici...
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

  
  constructor(
    private cookieService: CookieService,
    private apiService: ApiService  // Injectez votre service API
  ) {} 

  ngOnInit() {
    this.participantForm = new FormGroup({
      event: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      timeStart: new FormControl(''),
      timeEnd: new FormControl('')
    });
     }

     InscriptionUser(functionalId: string, participant: Participant) {
      const token = this.cookieService.get('sessionToken');
      //console.log('Token:', token);
  
      if (token) {
          // Récupération des données utilisateur
          this.userId= this.cookieService.get('userId');
        // Récupération des événements
        this.apiService.getEvents(token).subscribe(
          eventsData => {
              console.log('Events Data:', eventsData);
              console.log('User ID:', this.userId);
              console.log('User functionalId:', functionalId);
              console.log(participant);

              this.events = eventsData;
              const matchingEvent = this.events.find(event => event.functionalId === functionalId);

              // Vérification de l'existence du functionalId
              if (matchingEvent) {
                  console.log('Matching event found:', matchingEvent);
              } else {
                  console.log('No matching event found');

                  // Création d'un nouvel objet event avec les données du formulaire et du userId
                  const newEvent = {
                      DescriptionEvent: participant.event,
                      titleEvent: participant.event,
                      date: participant.date,
                      participant: [{userId: this.userId, heureStart: participant.timeStart? participant.timeStart: '', heureEnd: participant.timeEnd? participant.timeEnd: ''}],
                  };
                
                  console.log('New Event:', newEvent);

                  // Logique pour sauvegarder `newEvent` avec l'API
                  this.apiService.postNewEvent( token, newEvent).subscribe(
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
      const participant: Participant = this.participantForm.value;
       //construction functionalId
      const functionalId = `${participant.event}-${participant.date}`;
  
      console.log('Constructed functionalId:', functionalId);
  
      // Check if user is already a participant
     this.InscriptionUser(functionalId, participant)
    } else {
      console.log('Invalid form');
    }
  }
    
}
