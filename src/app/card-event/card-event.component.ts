import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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

  
  constructor(private cookieService: CookieService) { }

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
}}
