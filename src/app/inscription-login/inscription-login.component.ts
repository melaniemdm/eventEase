import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-inscription-login',
  templateUrl: './inscription-login.component.html',
  styleUrls: ['./inscription-login.component.scss']
})
export class InscriptionLoginComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) { } // Injectez le service API

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted:', this.signupForm.value);
      
      // Exemple d'appel de l'API, adaptez les paramètres comme nécessaire
      this.apiService.postUser(
          this.signupForm.value.password,
          this.signupForm.value.username,
          this.signupForm.value.email,
          this.signupForm.value.firstName,
          this.signupForm.value.lastName,
      ).subscribe(
          (data) => {
              console.log('Utilisateur créé:', data);
             
              // Gestion réussie de la création de l'utilisateur
          },
          (error) => {
              console.error('Erreur lors de la création de l’utilisateur:', error);
              // Vous pouvez montrer l'erreur à l'utilisateur via une alerte ou un toast, par exemple
          }
      );
  }}
}
