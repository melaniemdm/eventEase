import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from '../services/cookie-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName: string | null = null;

  constructor(
    private cookieManagerService: CookieManagerService
  ) {}

  ngOnInit(): void {
    //recuper dans le cookie le nom
    this.firstName = this.cookieManagerService.getFirstName();    
  }
}
