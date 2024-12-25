import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFieldErrorMessageComponent } from '../../shared/ui/form-field-error-message/form-field-error-message.component';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { FormField } from '../../core/interfaces/auth';
import { loginForm } from '../../shared/constants/form-groups.constants';
import { loginInputs } from '../../shared/constants/form-inputs.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    ReactiveFormsModule,
    RouterLink,
    FormFieldErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  isLoading = false;
  form: FormGroup = loginForm;
  inputs: FormField[] = loginInputs;

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.login(this.form.value).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  private handleSuccess(res: any): void {
    this.isLoading = false;
    if (res.message === 'success') {
      this.router.navigate(['/']);
      this.toast.success(`Welcome back`);
      localStorage.setItem('token', res.token);
      this.authService.saveUserData();
    }
  }

  private handleError(err: HttpErrorResponse): void {
    this.isLoading = false;
    this.toast.error(err.error.message);
  }
}
