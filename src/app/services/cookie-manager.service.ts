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
    // Utilisation de l'attribut "Secure" pour les cookies sensibles
    this.cookieService.set('sessionToken', sessionToken, undefined, undefined, undefined, true, 'Lax');
  }

  setUserId(userId: string): void {
    // Utilisation de l'attribut "Secure" pour les cookies sensibles
    this.cookieService.set('userId', userId, undefined, undefined, undefined, true, 'Lax');
  }

  setFirstName(firstName: string): void {
    // Utilisation de l'attribut "Secure" pour les cookies sensibles
    this.cookieService.set('firstName', firstName, undefined, undefined, undefined, true, 'Lax');
  }


  deleteSessionToken(): void {
    this.cookieService.delete('sessionToken');
  }



}
