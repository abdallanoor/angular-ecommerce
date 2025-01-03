import { FormBuilder, FormGroup } from '@angular/forms';
import { authValidators } from '../validators/app.validators';
import { confirmPassword } from '../utils/auth.utils';
const formBuilder = new FormBuilder();

export const registerForm: FormGroup = formBuilder.group(
  {
    name: ['', authValidators.name],
    email: ['', authValidators.email],
    password: ['', authValidators.password],
    rePassword: ['', authValidators.rePassword],
  },
  { validators: confirmPassword }
);

export const loginForm: FormGroup = formBuilder.group({
  email: ['ecommerce.angular@gmail.com', authValidators.email],
  password: ['11111111', authValidators.password],
});

export const sendEmailForm: FormGroup = formBuilder.group({
  email: ['', authValidators.email],
});
export const verifyCodeForm: FormGroup = formBuilder.group({
  resetCode: ['', authValidators.resetCode],
});
export const resetPasswordForm: FormGroup = formBuilder.group({
  email: ['', authValidators.email],
  newPassword: ['', authValidators.password],
});
export const shippingAddressForm: FormGroup = formBuilder.group({
  city: [''],
  phone: [''],
  details: [''],
});
export const changePasswordForm: FormGroup = formBuilder.group(
  {
    currentPassword: ['', authValidators.password],
    password: ['', authValidators.password],
    rePassword: ['', authValidators.rePassword],
  },
  { validators: confirmPassword }
);
