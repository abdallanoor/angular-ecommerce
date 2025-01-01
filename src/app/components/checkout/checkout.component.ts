import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormFieldErrorMessageComponent } from '../../shared/ui/form-field-error-message/form-field-error-message.component';
import { ToastService } from '../../core/services/toast.service';
import { FormField } from '../../core/interfaces/auth';
import { shippingAddressForm } from '../../shared/constants/form-groups.constants';
import { shippingAddressInputs } from '../../shared/constants/form-inputs.constants';
import { CheckoutService } from '../../core/services/checkout.service';
import { BagService } from '../../core/services/bag.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    ReactiveFormsModule,
    FormFieldErrorMessageComponent,
  ],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private activatedRoute = inject(ActivatedRoute);
  private checkoutService = inject(CheckoutService);
  private bagService = inject(BagService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  bagId: string = '';
  isOnlinePaymentLoading = false;
  isCashPaymentLoading = false;
  payMethod!: 'onlinePayment' | 'cashOnDelivery';
  form: FormGroup = shippingAddressForm;
  inputs: FormField[] = shippingAddressInputs;

  ngOnInit(): void {
    this.bagId = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  submit(): void {
    if (this.payMethod === 'onlinePayment') {
      this.handleOnlinePayment();
    } else if (this.payMethod === 'cashOnDelivery') {
      this.handleCashOnDelivery();
    }
  }

  private handleOnlinePayment(): void {
    this.isOnlinePaymentLoading = true;
    this.checkoutService.paymentOnline(this.bagId, this.form.value).subscribe({
      next: (res) => {
        window.location.href = res.session.url;
        this.isOnlinePaymentLoading = false;
        console.log(res);
      },
      error: (err) => {
        this.isOnlinePaymentLoading = false;
        this.toastService.error(err.error.message);
      },
    });
  }

  private handleCashOnDelivery(): void {
    this.isCashPaymentLoading = true;
    this.checkoutService.cashOnDelivery(this.bagId, this.form.value).subscribe({
      next: () => {
        this.isCashPaymentLoading = false;
        this.toastService.success('Order successful');
        this.bagService.bagCount.next(0);
        this.router.navigate(['/allorders']);
      },
      error: (err) => {
        this.isCashPaymentLoading = false;
        this.toastService.error(err.error.message);
      },
    });
  }
}
