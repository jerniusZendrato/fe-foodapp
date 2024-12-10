import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string) {
    const toastElement = document.getElementById('successToast');
    if (toastElement) {
      toastElement.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }

  showError(message: string) {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      // Menetapkan pesan toast
      toastElement.querySelector('.toast-body')!.textContent = message;
      
      // Mengatur kelas untuk menandakan toast error
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  

  constructor() { }
}
