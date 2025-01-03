import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { SkeletonModule } from 'primeng/skeleton';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormFieldErrorMessageComponent } from '../../shared/ui/form-field-error-message/form-field-error-message.component';
import { ToastService } from '../../core/services/toast.service';
import { userDetailsForm } from '../../shared/constants/form-groups.constants';
import { userDetailsInputs } from '../../shared/constants/form-inputs.constants';
import { FormField } from '../../core/interfaces/auth';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    ReactiveFormsModule,
    FormFieldErrorMessageComponent,
    SkeletonModule,
  ],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private platform = inject(PLATFORM_ID);

  updateIsLoading = false;
  getDataIsLoading = true;

  form: FormGroup = userDetailsForm;
  inputs: FormField[] = userDetailsInputs;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platform)) return;

    this.authService.userData.subscribe({
      next: (userData) => {
        this.fetchUserData(userData.id);
      },
    });
  }

  private fetchUserData(userId: string): void {
    this.userService.getLoggedUserData(userId).subscribe({
      next: (user) => {
        this.getDataIsLoading = false;
        this.form.patchValue({
          name: user.data.name,
          phone: user.data.phone || '',
          email: user.data.email,
        });
      },
      error: () => {
        this.getDataIsLoading = false;
        this.toastService.error('Failed to load user data');
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.updateIsLoading = true;
    const { phone, name } = this.form.value;
    this.userService.updateLoggedUserData({ phone, name }).subscribe({
      next: () => this.handleSuccess(),
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  private handleSuccess(): void {
    this.updateIsLoading = false;
    this.toastService.success('Your details have been updated');
    this.router.navigate(['/profile']);
  }

  private handleError(err: HttpErrorResponse): void {
    this.updateIsLoading = false;
    console.error(err);
    this.toastService.error(err.error.message);
  }
}
