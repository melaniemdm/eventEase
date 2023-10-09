import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {};

  onSubmit() {
    // Logique de traitement du formulaire ici (par exemple, envoi des données au serveur).
    console.log(this.user);
  }
}
