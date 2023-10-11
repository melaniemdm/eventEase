import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
  
  constructor(private cookieService: CookieService) {} 

  ngOnInit() {
    this.participantForm = new FormGroup({
      event: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      timeStart: new FormControl(''),
      timeEnd: new FormControl('')
    });
    
     // Affichez le token dans la console
     const token = this.cookieService.get('sessionToken'); 
     console.log('Token:', token);
     
  }

  onSubmit() {
    // recuperation des données du formulaire
    console.log('Statut du Formulaire:', this.participantForm.status);
  console.log('Valeurs du Formulaire:', this.participantForm.value);
  
  if (this.participantForm.valid) {
    const participant: Participant = this.participantForm.value;
    console.log(participant);
  } else {
    console.log('Formulaire non valide');
  }}

  
}
