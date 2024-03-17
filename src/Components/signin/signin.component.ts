import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  handleRegister(): void {
    this.isLoading = true;
    const userData = this.LoginForm.value;
    console.log(userData);

    this._AuthService.setLogin(userData).subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.isLoading = false;
          localStorage.setItem('etoken', response.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error.statusMsg === 'fail') {
          this.message = error.error.message
        } else {
          this.message = error.error.message;
          
        }
      },
    });
  }

  togglePasswordVisibility(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}