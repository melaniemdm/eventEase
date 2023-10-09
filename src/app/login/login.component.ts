import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {};
  errorMessage: string = ''; // Pour afficher les messages d'erreur

  constructor(private apiService: ApiService) { }

  async onSubmit() {
    try {
      const response = await this.apiService.getToken(this.user.email, this.user.password);
      // Gestion de la réussite de la connexion ici
      console.log('Réponse réussie :', response);
      this.errorMessage = ''; // Réinitialisez le message d'erreur en cas de succès
    } catch (error) {
      // Gestion de l'erreur de connexion ici
      console.error('Erreur de connexion :', error);
      this.errorMessage = 'Erreur de connexion. Veuillez vérifier vos informations.';
    }
  }
}
