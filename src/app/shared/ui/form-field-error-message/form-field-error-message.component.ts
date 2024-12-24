import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-form-field-error-message',
  standalone: true,
  imports: [Message],
  templateUrl: './form-field-error-message.component.html',
})
export class FormFieldErrorMessageComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
}
