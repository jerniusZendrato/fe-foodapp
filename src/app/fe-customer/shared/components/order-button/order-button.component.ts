import { Component, EventEmitter, Output } from '@angular/core';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-order-button',
  template: `
    <div
      class="checkout-container"
      *ngIf="orderService.getProductTotalQuantity() > 0"
    >
      <div class="button-content">
        <div class="price-container">
          <span class="label">Total Payment</span>
          <span class="price">{{
            orderService.getSubTotalPrice() | currency : 'Rp'
          }}</span>
        </div>  
        <button type="button" class="process-button" (click)="openProcessModal()">
          Process Order
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .checkout-container {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        width: 85%;
        max-width: 450px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        border-radius: 16px;
        overflow: hidden;
        background: white;
        padding: 10px;
      }

      .button-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .price-container {
        display: flex;
        flex-direction: column;
        color: black;
        text-align: left;
        margin-left: 12px;
      }

      .label {
        font-size: 14px;
        font-weight: 500;
      }

      .price {
        font-size: 18px;
        font-weight: 700;
      }

      .process-button {
        background-color: #28a745;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        padding: 10px 16px;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .process-button:hover {
        background-color: #218838;
      }
    `,
  ],
})
export class OrderButtonComponent {
  
  @Output() processOrderEvent = new EventEmitter<void>();

  constructor(
    public orderService: OrderLocalStorageCustService,
    public derect: DerectService
  ) {}

  openProcessModal() {
    console.log("object");
    this.processOrderEvent.emit(); // Emit event ke parent untuk membuka modal
  }
}
