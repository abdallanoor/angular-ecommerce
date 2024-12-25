import { FormField } from '../../core/interfaces/auth';

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
