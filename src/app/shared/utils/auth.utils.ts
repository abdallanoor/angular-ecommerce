import { AbstractControl } from '@angular/forms';

export function confirmPassword(g: AbstractControl) {
  return g.get('password')?.value == g.get('rePassword')?.value
    ? null
    : { mismatch: true };
}
