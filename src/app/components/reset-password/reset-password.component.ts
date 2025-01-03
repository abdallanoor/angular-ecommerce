import {
  sendEmailForm,
  verifyCodeForm,
  resetPasswordForm,
} from '../../shared/constants/form-groups.constants';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { InputOtp } from 'primeng/inputotp';
import {
  resetPasswordInputs,
  sendEmailInputs,
  verifyCodeInputs,
} from '../../shared/constants/form-inputs.constants';
import { isPlatformBrowser } from '@angular/common';

type Steps = 1 | 2 | 3;

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    ReactiveFormsModule,
    FormFieldErrorMessageComponent,
    StepsModule,
    InputOtp,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private platform = inject(PLATFORM_ID);

  isLoading = false;
  steps: Steps = 1;
  items: MenuItem[] = [
    { label: 'Send email' },
    { label: 'Verify Code' },
    { label: 'Reset Password' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.steps = (Number(localStorage.getItem('resetStep')) as Steps) || 1;
    }
  }

  get form(): FormGroup {
    switch (this.steps) {
      case 1:
        return sendEmailForm;
      case 2:
        return verifyCodeForm;
      case 3:
        return resetPasswordForm;
      default:
        throw new Error('Invalid step');
    }
  }

  get inputDescription(): string {
    const descriptions: Record<Steps, string> = {
      1: 'We will send you an e-mail to reset your password',
      2: 'Enter Verification Code',
      3: 'Enter New Password',
    };
    return descriptions[this.steps];
  }

  get buttonLabel(): string {
    const labels: Record<Steps, string> = {
      1: 'Send',
      2: 'Verify',
      3: 'Reset',
    };
    return labels[this.steps];
  }

  get inputsData(): any[] {
    switch (this.steps) {
      case 1:
        return sendEmailInputs;
      case 2:
        return verifyCodeInputs;
      case 3:
        return resetPasswordInputs;
      default:
        throw new Error('Invalid step');
    }
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const handleError = (err: HttpErrorResponse) => {
      this.isLoading = false;
      this.toastService.error(err.error.message);
    };

    const handleSuccess = (message: string, nextStep?: Steps) => {
      this.isLoading = false;
      if (nextStep !== undefined) {
        this.steps = nextStep;
        localStorage.setItem('resetStep', this.steps.toString());

        if (nextStep === 3) {
          const email = localStorage.getItem('resetEmail') || '';
          resetPasswordForm.get('email')?.setValue(email);
        }
      }
      this.toastService.success(message);
    };

    switch (this.steps) {
      case 1:
        this.authService.forgotPassword(this.form.value).subscribe({
          next: () => {
            localStorage.setItem(
              'resetEmail',
              this.form.get('email')?.value || ''
            );
            handleSuccess('Reset code sent to your email', 2);
          },
          error: handleError,
        });
        break;

      case 2:
        this.authService.verifyResetCode(this.form.value).subscribe({
          next: () => handleSuccess('Verified successfully', 3),
          error: handleError,
        });
        break;

      case 3:
        this.authService.resetPassword(this.form.value).subscribe({
          next: (res) => {
            localStorage.removeItem('resetStep');
            localStorage.removeItem('resetEmail');
            localStorage.setItem('token', res.token);
            this.authService.saveUserData();
            this.router.navigate(['/']);
            handleSuccess('Welcome back');
          },
          error: handleError,
        });
        break;

      default:
        this.isLoading = false;
        this.toastService.error('Unexpected error occurred');
    }
  }

  clearData(): void {
    this.steps = 1;
    localStorage.removeItem('resetStep');
    localStorage.removeItem('resetEmail');
  }
}
