import { Component } from '@angular/core';
import { CookieManagerService } from '../services/cookie-manager.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent {
  constructor(private cookieManagerService: CookieManagerService, private router: Router) { }

  logout(): void {
    this.cookieManagerService.deleteSessionToken();
    this.router.navigate(['/login']);
  }
}
