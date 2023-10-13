import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Assurez-vous que le chemin est correct
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName: string | null = null;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    //recuper dans le cookie le nom
     this.firstName = this.cookieService.get('firstName');
    
  }
}
