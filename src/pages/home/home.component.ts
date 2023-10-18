import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
    private cookieService: CookieService, 
    private router: Router,
    private apiService: ApiService // Injection du service API
  ) { }

  ngOnInit(): void {
    this.checkToken();
    this.loadEvents();
  }

  checkToken(): void {
    const token = this.cookieService.get('sessionToken');

    if (!token) {
      this.router.navigate(['/login']);
    }

   
  }

  loadEvents(): void {
    const token = this.cookieService.get('sessionToken');
    const userId = this.cookieService.get('userId');
    //console.log('Token:', token);
    // S'assurer que le token est présent avant de faire l'appel API
    this.apiService.getEvents(token).subscribe(
      (data: any) => {
        //console.log('Data reçue:', data);
        this.events = data; // Remplacez par la clé réelle
        //create array my events
        this.myEvents=this.events.filter(event => event.participant.find((participant:Participant) => participant.userId === userId));
        console.log(this.myEvents);
        // console.log(data.results[0].titleEvent)
        // console.log(data.results[0].date)
        // console.log(data.results[0].heureStart)
        // console.log(data.results[0].heureEnd)
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }
}

