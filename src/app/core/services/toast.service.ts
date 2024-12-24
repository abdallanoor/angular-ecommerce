import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageService = inject(MessageService);
  success(message: string) {
    this.messageService.add({
      severity: 'contrast',
      detail: message,
      icon: 'pi pi-check',
      contentStyleClass: '!items-center',
      closable: false,
    });
  }
  error(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,
      contentStyleClass: '!items-center',
      closable: false,
    });
  }
}
