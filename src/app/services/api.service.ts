import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

 // Mise à jour d'un événement
 updateEvent(token: string, event: any): Observable<any> {
  const headers = new HttpHeaders({
    'X-Parse-Application-Id': 'QWTbbVUM0cgT6tJ7lLQy9PkbjXMBKowV8MZbcHuf',
    'X-Parse-REST-API-Key': 'c4i667Si4Cca196QyhTIWdz4vVuQ1KNR8CTwnlIv',
    'X-Parse-Session-Token': token
  });
// creer un replica de event sans objectId
const eventReplica = { ...event };
delete eventReplica.objectId;
delete eventReplica.createdAt;
delete eventReplica.updatedAt;

  return this.http.put(`${this.apiUrl}/classes/Event/${event.objectId}`, eventReplica, { headers }).pipe(
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
  
    return this.http.get<any>(`${this.apiUrl}/classes/Event`, { headers }).pipe(
      map(response => response.results),  // Map response to response.results
      catchError(this.handleError)
    );
  }

  // Cette méthode handleError est définie comme une méthode de la classe, en dehors du constructeur
  private handleError(error: HttpErrorResponse) {
    console.error('Détails de l\'erreur:', error);

    let userMessage = 'Quelque chose a mal tourné ; veuillez réessayer plus tard.';

    if (error.error instanceof ErrorEvent) {
        console.error('Erreur côté client :', error.error.message);
    } else {
        console.error(`Erreur API, statut : ${error.status}, message : ${JSON.stringify(error.error)}`);
        
        // Vous pouvez également consigner des propriétés spécifiques de l'objet d'erreur, s'il en a
        // Par exemple, si l'API renvoie { "message": "Description de l'erreur" }
        if (error.error.message) {
            console.error('Message d\'erreur de l\'API :', error.error.message);
        }

        // Vous pouvez définir d'autres messages utilisateur basés sur le statut de l'erreur HTTP
        if (error.status === 400) {
            userMessage = 'Requête invalide. Vérifiez les données soumises.';
        }
        // ... Autres statuts HTTP et leurs messages respectifs
    }

    return throwError(userMessage);
}}
