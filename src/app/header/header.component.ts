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
    const token = this.cookieService.get('sessionToken');
     // Affichage du token dans la console
     console.log('sessionToken', token);
    if (token) {
      this.apiService.getUser(token).subscribe(
        response => {
          this.firstName = response.firstName;
          console.log(this.firstName);
        },
        error => {
          console.error('Failed to get username', error);
        }
      );
    }
  }
}
