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
    console.log('object :>> ');
    this.router.navigate(['/cart']);
  }

  toOrderSummary(idOrder : string | undefined) {
    console.log('idOrder :>> ', idOrder);
    this.router.navigate([`/order/summary/${idOrder}`]);
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