import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

interface Participant {
  userId: string;
  heureStart?: string;
  heureEnd?: string;
}

interface Event {
  titleEvent: string;
  participant: Participant[];
  // ... d'autres propriétés ici ...
}



@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss']
})


export class CardEventComponent implements OnInit{
  
  @Input() heureStart: string ='';
  @Input() heureEnd: string ='';
  @Input() event: any;

  
  constructor(private cookieService: CookieService, 
    private apiService: ApiService,
    private router: Router) { }
  
  ngOnInit(): void {
    // recuperer le userId dans le cookie
    const userId = this.cookieService.get('userId'); // Utiliser `this` pour accéder à `cookieService`.
    console.log('userId', userId);
    // voir si event est un type collecte
    if (this.event.titleEvent === 'Collecte alimentaire') {
     // recuperer les heures de collecte du userId  
     const participantInfo = this.event.participant.find((part: Participant) => part.userId === userId);
console.log(participantInfo)
// affiche les heures de collecte
     this.heureStart = participantInfo.heureStart;
     this.heureEnd = participantInfo.heureEnd;
    } 
   
}
// fonction pour se desinscrire
  unregister(event: any): void {
    // recuperer le userId dans le cookie
    const userId = this.cookieService.get('userId'); // Utiliser `this` pour accéder à `cookieService`.
    const token = this.cookieService.get('sessionToken');
    console.log('userId', userId);
         // supprimer l'utilisateur de la liste des événements auxquels il est inscrit
         this.event.participant = this.event.participant.filter((participant: Participant) => participant.userId !== userId);
        // Call the updateEvent qui est dans api service et function to update the backend
        this.apiService.updateEvent(token, this.event).subscribe(
          (data: any) => {
            console.log('Event updated successfully:', data);
            // Use angular router to reload the page
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(['/home']));
                   },
          (error) => {
            console.error('Error updating event:', error);
          }

        );
      
    // ou faire un appel API pour informer le backend de la désinscription, etc.
    
    console.log('utilisateur participant à l\'event', event.participant)
    console.log('Utilisateur désinscrit de l’événement:', event.titleEvent, event.date, userId, event.objectId);
  }


}

