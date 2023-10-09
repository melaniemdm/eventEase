import { Component } from '@angular/core';

@Component({
  selector: 'app-inscription-event',
  templateUrl: './inscription-event.component.html',
  styleUrls: ['./inscription-event.component.scss']
})
export class InscriptionEventComponent {
  participant: any = {};

  onSubmit() {
    // Logique de traitement du formulaire ici (par exemple, envoi des données au serveur).
    console.log(this.participant);
  }
}
