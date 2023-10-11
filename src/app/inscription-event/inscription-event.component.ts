import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';


interface Participant {
  event: string;
  date: string;
  timeStart?: string;
  timeEnd?: string;
}

@Component({
  selector: 'app-inscription-event',
  templateUrl: './inscription-event.component.html',
  styleUrls: ['./inscription-event.component.scss']
})
export class InscriptionEventComponent implements OnInit {
  participantForm!: FormGroup;
  events: any[] = [];  // Propriété pour stocker les événements

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
    
    // Obtenez et affichez le token dans la console
    const token = this.cookieService.get('sessionToken'); 
    console.log('Token:', token);

    // Utilisez le token pour obtenir les données de l'utilisateur via votre service API
    if (token) {
      this.apiService.getUser(token).subscribe(
        data => console.log('User Data:', data),
        error => console.log('Error:', error)
      );
       // Appel pour récupérer et afficher les événements dans la console
   this.apiService.getEvents(token).subscribe(
    eventsData => console.log('Events Data:', eventsData),
    error => console.log('Events Error:', error)
  );// Appel pour récupérer et stocker les événements dans la propriété events
     
      
    }
   

  }

  onSubmit() {
    // Récupération des données du formulaire
    console.log('Statut du Formulaire:', this.participantForm.status);
    console.log('Valeurs du Formulaire:', this.participantForm.value);
  
    if (this.participantForm.valid) {
      const participant: Participant = this.participantForm.value;
      console.log(participant);
    } else {
      console.log('Formulaire non valide');
    }
  }  
}
