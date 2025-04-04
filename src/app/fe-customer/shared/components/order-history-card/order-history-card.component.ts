import { Component, Input } from '@angular/core';
import { OrderHistoryCust as OrderHistory } from '../../models/order-history.model';
import { DerectService } from '../../services/derect.service';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';

@Component({
  selector: 'app-order-history-card',
  template: `
    <div
      style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); background-color: #fff;"
    >
      <div style="display: flex; align-items: center ">
        <div style="flex: 0 0 40px; text-align: center;">
          <i class="fa-solid fa-cart-plus fa-2x"></i>
        </div>
        <div style="flex: 1; padding-left: 12px;">
          <div style="font-size: 14px; font-weight: bold; color: #333;">
            KANTIN K’JAYA
          </div>
          <div style="font-size: 12px; color: #555;">
            {{ order.totalPrice | currency : 'Rp' }} ({{ order.totalQuantity }}
            items)
          </div>
          <div style="font-size: 12px; color: #777;">#{{ order.code }}</div>
        </div>
        <div style="flex: 0 0 auto;">
          <button
            style="background-color: transparent; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; transition: color 0.3s;"
            (click)="derect.historyDetailPage(order.id)"
          >
            Detail
            <i class="fa-solid fa-chevron-right" style="margin-left: 4px;"></i>
          </button>
        </div>
      </div>
      <hr />
      <div
        style="display: flex; justify-content: space-between; align-items: center;"
      >
        <div style="font-size: 12px; color: #555;">
          <div>{{ order.type }}</div>
          <div>{{ order.createdAt | date : 'medium' }}</div>
        </div>
        <div>
          <button
            (click)="order.id && reorder(order.id)"
            class="rounded-button"
            style="background-color: #28a745; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; display: flex; align-items: center; transition: background-color 0.3s;"
          >
            Order Again
            <i class="fa-solid fa-cart-plus" style="margin-left: 4px;"></i>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class OrderHistoryCardComponent {
  @Input() order!: OrderHistory;

  constructor(
    public derect: DerectService,
    private readonly orderService: OrderLocalStorageCustService
  ) {}

  reorder(orderId: string) {
    const success = this.orderService.makeOrderAgain(orderId);
    if (success) {
      // Navigasi ke halaman order atau tampilkan pesan sukses
      this.derect.toMenuPage();
    } else {
      // Tampilkan pesan error
      console.error('Failed to reorder');
    }
  }
}
