import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';  // Importez le CookieService
import { Router } from '@angular/router'; // Importez le service Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {};
  errorMessage: string = ''; // Pour afficher les messages d'erreur

  constructor(private apiService: ApiService, 
    private cookieService: CookieService, 
    private router: Router ) { }

  onSubmit() {
    this.apiService.getToken(this.user.email, this.user.password).subscribe(
      response => {
        // Gestion de la réussite de la connexion ici
       console.log('Réponse réussie :', response);
        
        // Si l'API renvoie un token, enregistrez-le dans un cookie
        if (response && response.sessionToken) {
          this.cookieService.set('sessionToken', response.sessionToken);
          this.cookieService.set('userId', response.objectId);
          this.cookieService.set('firstName', response.firstName);
           // Naviguer vers la route racine
           this.router.navigate(['/']);
        }

        this.errorMessage = ''; // Réinitialisez le message d'erreur en cas de succès
      },
      error => {
        // Gestion de l'erreur de connexion ici
       // console.error('Erreur de connexion :', error);
        this.errorMessage = 'Erreur de connexion. Veuillez vérifier vos informations.';
      }
    );
  }
}
