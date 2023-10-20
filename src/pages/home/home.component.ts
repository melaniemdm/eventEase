import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from 'src/app/services/cookie-manager.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface Participant {
  userId: string;
  heureStart?: string;
  heureEnd?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: any[] = []; // Pour stocker les événements récupérés
  myEvents: any[] = [];
  constructor(
    private cookieManagerService: CookieManagerService, 
    private router: Router,
    private apiService: ApiService // Injection du service API
  ) { }

  ngOnInit(): void {
    this.checkToken();
    this.loadEvents();
  }

  checkToken(): void {
    const token = this.cookieManagerService.getSessionToken();

    if (!token) {
      this.router.navigate(['/login']);
    }

   
  }

  loadEvents(): void {
    const token = this.cookieManagerService.getSessionToken();
    const userId = this.cookieManagerService.getUserId();
    
    // S'assurer que le token est présent avant de faire l'appel API
    this.apiService.getEvents(token).subscribe(
      (data: any) => {
        // Remplacez par la clé réelle
        this.events = data; 
       
        this.myEvents = this.events
        .filter(event => event.participant.find((participant: Participant) => participant.userId === userId))
        .sort((a, b) => {
            return a.date.localeCompare(b.date);
          
        });
        console.log(this.myEvents);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }
}

