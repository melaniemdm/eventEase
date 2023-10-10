import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://parseapi.back4app.com';

  constructor(private http: HttpClient) { }

  // Récupération du token
  getToken(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Parse-Application-Id': 'QWTbbVUM0cgT6tJ7lLQy9PkbjXMBKowV8MZbcHuf',
      'X-Parse-REST-API-Key': 'c4i667Si4Cca196QyhTIWdz4vVuQ1KNR8CTwnlIv',
      'X-Parse-Revocable-Session': '1'
    });

    const queryParams = `?username=${email}&password=${password}`;

    return this.http.get(`${this.apiUrl}/login${queryParams}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupération du nom de l'utilisateur
  getUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Parse-Application-Id': 'QWTbbVUM0cgT6tJ7lLQy9PkbjXMBKowV8MZbcHuf',
      'X-Parse-REST-API-Key': 'c4i667Si4Cca196QyhTIWdz4vVuQ1KNR8CTwnlIv',
      'X-Parse-Session-Token': token
    });

    return this.http.get(`${this.apiUrl}/users/me`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Enregistrement de l'utilisateur
  postUser(password: string, username: string, email: string, firstName: string, lastName: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Parse-Application-Id': 'QWTbbVUM0cgT6tJ7lLQy9PkbjXMBKowV8MZbcHuf',
      'X-Parse-REST-API-Key': 'c4i667Si4Cca196QyhTIWdz4vVuQ1KNR8CTwnlIv',
      'X-Parse-Revocable-Session': '1'
    });

    const body = {
      password,
      username,
      email,
      firstName,
      lastName
    };

    return this.http.post(`${this.apiUrl}/users`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Création d'un événement
  postNewEvent(token: string, event: any): Observable<any> {
    const headers = new HttpHeaders({
      'X-Parse-Application-Id': 'QWTbbVUM0cgT6tJ7lLQy9PkbjXMBKowV8MZbcHuf',
      'X-Parse-REST-API-Key': 'c4i667Si4Cca196QyhTIWdz4vVuQ1KNR8CTwnlIv',
      'X-Parse-Session-Token': token
    });

    return this.http.post(`${this.apiUrl}/classes/Event`, event, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Récupération des événements
  getEvents(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'X-Parse-Application-Id': 'QWTbbVUM0cgT6tJ7lLQy9PkbjXMBKowV8MZbcHuf',
      'X-Parse-REST-API-Key': 'c4i667Si4Cca196QyhTIWdz4vVuQ1KNR8CTwnlIv',
      'X-Parse-Session-Token': token
    });

    return this.http.get<any[]>(`${this.apiUrl}/classes/Event`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Erreur côté client :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(`Code d'erreur : ${error.status}, ` + `Message : ${error.message}`);
    }
    // Renvoyer une observable avec un message d'erreur convivial pour l'utilisateur
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }
}
