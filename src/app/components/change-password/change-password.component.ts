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
import { changePasswordForm } from '../../shared/constants/form-groups.constants';
import { changePasswordInputs } from '../../shared/constants/form-inputs.constants';
import { FormField } from '../../core/interfaces/auth';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-change-password',
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
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private toast = inject(ToastService);

  isLoading = false;

  form: FormGroup = changePasswordForm;
  inputs: FormField[] = changePasswordInputs;

  submit(): void {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.userService.changePassword(this.form.value).subscribe({
      next: () => this.handleSuccess(),
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.toast.success('Password changed. Please login again');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private handleError(err: HttpErrorResponse): void {
    this.isLoading = false;
    this.toast.error(err.error.errors.msg);
  }
}
