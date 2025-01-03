import { Validators } from '@angular/forms';

export const authValidators = {
  name: [Validators.required, Validators.minLength(3)],
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.minLength(8)],
  rePassword: [Validators.required],
  resetCode: [Validators.required],
};
