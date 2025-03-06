import { Component, Input } from '@angular/core';
import { OrderHistoryCust as OrderHistory } from '../../models/order-history.model';

@Component({
  selector: 'app-order-history-card',
  template: `
    <div class="card p-2">
      <div class="row align-items-center">
        <div class="col-2 d-flex justify-content-center">
          <i class="fa-solid fa-cart-plus fa-2x"></i>
        </div>
        <div class="col-6">
          <div style="display: flex; flex-direction: column">
            <span style="font-size: 12px">KANTIN K’JAYA</span>
            <span style="font-size: 12px"
              >{{ order.totalPrice | currency : 'Rp' }}  ({{order.totalItem}} items)</span
            >
            <span style="font-size: 12px">#{{order.code}}</span>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <button class="btn">
            Detail
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between align-items-center">
        <div style="display: flex; flex-direction: column">
          <span style="font-size: 12px">{{order.type}}</span>
          <span style="font-size: 12px">23 Feb 2025, 15.30</span>
          <span style="font-size: 12px">{{order.date}}</span>
        </div>
        <div>
          <button type="button" class="btn btn-success btn-sm">
            Order Again
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./order-history-card.component.css'],
})
export class OrderHistoryCardComponent {
  @Input() order!: OrderHistory;
}
