import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CookieManagerService } from '../services/cookie-manager.service'; 
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
    private cookieManagerService: CookieManagerService, 
    private router: Router ) { }

  onSubmit() {
    this.apiService.getToken(this.user.email, this.user.password).subscribe(
      response => {
        // Gestion de la réussite de la connexion ici
       console.log('Réponse réussie :', response);
        
        // Si l'API renvoie un token, enregistrez-le dans un cookie
        if (response?.sessionToken) {
          this.cookieManagerService.setSessionToken(response.sessionToken);
          this.cookieManagerService.setUserId(response.objectId);
          this.cookieManagerService.setFirstName(response.firstName);

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

  onSignup(): void {
    // envoie vers la page inscription
 this.router.navigate(['/inscriptionLogin']);
  }
}
