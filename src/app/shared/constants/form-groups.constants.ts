import { FormBuilder, FormGroup } from '@angular/forms';
import { registerValidators } from '../validators/app.validators';
import { confirmPassword } from '../utils/app.utils';
const formBuilder = new FormBuilder();

export const registerForm: FormGroup = formBuilder.group(
  {
    name: ['', registerValidators.name],
    email: ['', registerValidators.email],
    password: ['', registerValidators.password],
    rePassword: ['', registerValidators.rePassword],
  },
  { validators: confirmPassword }
);

export const loginForm: FormGroup = formBuilder.group({
  email: ['ecommerce.angular@gmail.com', registerValidators.email],
  password: ['11111111', registerValidators.password],
});

export const sendEmailForm: FormGroup = formBuilder.group({
  email: ['', registerValidators.email],
});
export const verifyCodeForm: FormGroup = formBuilder.group({
  resetCode: ['', registerValidators.resetCode],
});
export const resetPasswordForm: FormGroup = formBuilder.group({
  email: ['', registerValidators.email],
  newPassword: ['', registerValidators.password],
});
