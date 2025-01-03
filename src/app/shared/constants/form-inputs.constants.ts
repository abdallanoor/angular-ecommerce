import { FormField } from '../../core/interfaces/auth';

export const registerInputs: FormField[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'rePassword', label: 'Confirm Password', type: 'password' },
];

export const loginInputs: FormField[] = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

export const sendEmailInputs: FormField[] = [
  { name: 'email', label: 'Email', type: 'email' },
];
export const verifyCodeInputs: FormField[] = [
  { name: 'resetCode', label: '', type: 'otp' },
];
export const resetPasswordInputs: FormField[] = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'newPassword', label: 'New password', type: 'password' },
];
export const shippingAddressInputs: FormField[] = [
  { name: 'city', label: 'City', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'details', label: 'Details', type: 'text' },
];
export const changePasswordInputs: FormField[] = [
  { name: 'currentPassword', label: 'Current', type: 'password' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'rePassword', label: 'Confirm Password', type: 'password' },
];
export const userDetailsInputs: FormField[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
];
