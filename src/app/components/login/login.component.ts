import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormFieldErrorMessageComponent } from '../../shared/ui/form-field-error-message/form-field-error-message.component';
import { confirmPassword } from '../../shared/utils/app.utils';
import { registerValidators } from '../../shared/validators/app.validators';
import { AuthService } from '../../core/services/auth.service';
import { Message } from 'primeng/message';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    RouterLink,
    ReactiveFormsModule,
    FormFieldErrorMessageComponent,
    Message,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  isLoading: boolean = false;

  loginForm: FormGroup = this._formBuilder.group({
    email: ['ecommerce.angular@gmail.com', registerValidators.email],
    password: ['11111111', registerValidators.password],
  });

  inputsData: FormField[] = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            this._router.navigate(['/']);
            this._toast.success(`Welcome back, ${res.user.name}!`);
            localStorage.setItem('token', res.token);
            this._authService.saveUserData();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this._toast.error(err.error.message);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
