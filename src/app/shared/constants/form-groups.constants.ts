import { FormBuilder, FormGroup } from '@angular/forms';
import { registerValidators } from '../validators/app.validators';
const formBuilder = new FormBuilder();

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
