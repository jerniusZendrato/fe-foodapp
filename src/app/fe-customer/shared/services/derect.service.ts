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

  toHistoryOrderPage() {
    this.router.navigate(['/history']);
  }

  historyDetailPage(id: string | undefined) {
    this.router.navigate([`/history/${id}`]);
  }

  toOrderDetailPage(id: string) {
    this.router.navigate([`/order/${id}`]);
  }

  goBack() {
    const previousUrl = window.history.state?.previousUrl;


    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      // If no previous URL stored in history state, try to go back in browser history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // If no browser history, navigate to root
        this.router.navigate(['/']);
      }
    }
  }
}
