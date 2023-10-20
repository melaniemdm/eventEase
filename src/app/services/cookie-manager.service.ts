import { Injectable } from '@angular/core';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  private encryptionKey: string;

  private readonly COOKIE_OPTIONS: {
    path: string,
    domain?: string,
    secure: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict'
  } = {
    path: '/',
    domain: undefined,
    secure: true,
    sameSite: 'Lax'
  };
  

  constructor(private encryptCookieService: NgxEncryptCookieService) {
    // Génération de la clé de chiffrement pour les cookies.
    this.encryptionKey = this.encryptCookieService.generateKey();
  }

  getUserId(): string {
    try {
      return this.encryptCookieService.get('userId', true, this.encryptionKey);
    } catch (error) {
      console.error('Error retrieving userId cookie:', error);
      return "";
    }
  }

  getSessionToken(): string {
    try {
      return this.encryptCookieService.get('sessionToken', true, this.encryptionKey);
    } catch (error) {
      console.error('Error retrieving sessionToken cookie:', error);
      return "";
    }
  }

  getFirstName(): string {
    try {
      return this.encryptCookieService.get('firstName', true, this.encryptionKey);
    } catch (error) {
      console.error('Error retrieving firstName cookie:', error);
      return "";
    }
  }

  setSessionToken(sessionToken: string): void {
    try {
      this.encryptCookieService.set('sessionToken', sessionToken, true, this.encryptionKey, undefined, this.COOKIE_OPTIONS.path, this.COOKIE_OPTIONS.domain, this.COOKIE_OPTIONS.secure, this.COOKIE_OPTIONS.sameSite);
    } catch (error) {
      console.error('Error setting sessionToken cookie:', error);
    }
  }

  setUserId(userId: string): void {
    try {
      this.encryptCookieService.set('userId', userId, true, this.encryptionKey, undefined, this.COOKIE_OPTIONS.path, this.COOKIE_OPTIONS.domain, this.COOKIE_OPTIONS.secure, this.COOKIE_OPTIONS.sameSite);
    } catch (error) {
      console.error('Error setting userId cookie:', error);
    }
  }

  setFirstName(firstName: string): void {
    try {
      this.encryptCookieService.set('firstName', firstName, true, this.encryptionKey, undefined, this.COOKIE_OPTIONS.path, this.COOKIE_OPTIONS.domain, this.COOKIE_OPTIONS.secure, this.COOKIE_OPTIONS.sameSite);
    } catch (error) {
      console.error('Error setting firstName cookie:', error);
    }
  }

  deleteSessionToken(): void {
    try {
      this.encryptCookieService.delete('sessionToken', this.COOKIE_OPTIONS.path, this.COOKIE_OPTIONS.domain, this.COOKIE_OPTIONS.secure, this.COOKIE_OPTIONS.sameSite);
    } catch (error) {
      console.error('Error deleting sessionToken cookie:', error);
    }
  }

  deleteAllCookies(): void {
    try {
      this.encryptCookieService.deleteAll(this.COOKIE_OPTIONS.path, this.COOKIE_OPTIONS.domain, this.COOKIE_OPTIONS.secure, this.COOKIE_OPTIONS.sameSite);
    } catch (error) {
      console.error('Error deleting all cookies:', error);
    }
  }
}
