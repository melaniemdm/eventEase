import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  
  ngOnInit() {
    this.participantForm = new FormGroup({
      event: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      timeStart: new FormControl(''),
      timeEnd: new FormControl('')
    });
    
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
