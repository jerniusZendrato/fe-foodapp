import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DerectService {
  constructor(private readonly router: Router) {}

  toSearchPage() {
    this.router.navigate(['/search']);
  }

  toMenuPage() {
    this.router.navigate(['/']);
  }

  toCartPage() {
    this.router.navigate(['/cart']);
  }

  toOrderSummary() {
    this.router.navigate([`/order/summary`]);
  }
  refreshPage() {
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }

  historyOrderPage() {
    this.router.navigate(['/history']);
  }

  historyDetailPage(id: string) {
    console.log('id :>> ', id);
    this.router.navigate([`/history/${id}`]);
  }

  toOrderDetailPage(id: string) {
    this.router.navigate([`/order/${id}`]);
  }
  
}