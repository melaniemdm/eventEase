import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent {
  constructor(private cookieService: CookieService, private router: Router) { }

  logout(): void {
    this.cookieService.delete('sessionToken');
    this.router.navigate(['/login']);
  }
}
