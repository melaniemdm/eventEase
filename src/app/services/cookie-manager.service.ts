import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  constructor(private cookieService: CookieService) {}

  getUserId(): string {
    return this.cookieService.get('userId');
  }

  getSessionToken(): string {
    return this.cookieService.get('sessionToken');
  }

  getFirstName(): string | null {
    return this.cookieService.get('firstName');
  }

  setSessionToken(sessionToken: string): void {
    this.cookieService.set('sessionToken', sessionToken);
  }
  setUserId(userId: string): void {
    this.cookieService.set('userId', userId);
  }

  setFirstName(firstName: string): void {
    this.cookieService.set('firstName', firstName);
  }

  deleteSessionToken(): void {
    this.cookieService.delete('sessionToken');
  }



}
