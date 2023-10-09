import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(): void {
    const token = this.cookieService.get('sessionToken');

    if (!token) {
      this.router.navigate(['/login']);
    }

    // Vous pouvez également effectuer des validations supplémentaires sur le token ici si nécessaire.
  }
}
