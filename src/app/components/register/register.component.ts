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
    Message,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  isLoading: boolean = false;

  registerForm: FormGroup = this._formBuilder.group(
    {
      name: ['', registerValidators.name],
      email: ['', registerValidators.email],
      password: ['', registerValidators.password],
      rePassword: ['', registerValidators.rePassword],
    },
    { validators: confirmPassword }
  );

  inputsData: FormField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'rePassword', label: 'Confirm Password', type: 'password' },
  ];

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            this._router.navigate(['/login']);
            this._toast.success('Account created successfully');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this._toast.error(err.error.message);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
