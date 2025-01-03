import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormFieldErrorMessageComponent } from '../../shared/ui/form-field-error-message/form-field-error-message.component';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { registerForm } from '../../shared/constants/form-groups.constants';
import { registerInputs } from '../../shared/constants/form-inputs.constants';
import { FormField } from '../../core/interfaces/auth';

@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  isLoading = false;

  form: FormGroup = registerForm;
  inputs: FormField[] = registerInputs;

  registerSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.register(this.form.value).subscribe({
      next: ({ message }) => this.handleSuccess(message),
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  private handleSuccess(message: string): void {
    this.isLoading = false;
    if (message === 'success') {
      this.router.navigate(['/login']);
      this.toastService.success('Account created successfully');
    }
  }

  private handleError(err: HttpErrorResponse): void {
    this.isLoading = false;
    this.toastService.error(err.error.message);
  }
}
