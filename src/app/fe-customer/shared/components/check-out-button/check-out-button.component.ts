import { Component } from '@angular/core';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-check-out-button',
  template: `
    <div class="checkout-button-container" *ngIf="orderService.getProductTotalQuantity() > 0">
      <button type="button" class="checkout-button" routerLink="/cart">
        <div class="button-content">
          <div class="icon-container">
            <i class="fa-solid fa-cart-plus fa-2xl">
              <span class="badge">
                {{ orderService.getProductTotalQuantity() }}
              </span>
            </i>
          </div>
          <span class="total-payment">
            <strong>Total Payment</strong> <br />
            {{ orderService.getSubTotalPrice() | currency : "Rp" }}
          </span>
        </div>
      </button>
    </div>
  `,
  styles: [`
    .checkout-button-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: 85%;
      max-width: 450px;
      background-color: #ff0000;
      border-radius: 24px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .checkout-button {
      width: 100%;
      padding: 0;
      border: none;
      background-color: #ff0000;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .checkout-button:hover {
      background-color: #e60000;
    }

    .button-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      color: black;
      border-radius: 5px;
      height: 70px;
      width: 80px;
      position: relative;
    }

    .icon-container i {
      color: #ff0000;
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      background-color: #333;
      color: white;
      border-radius: 50%;
      padding: 5px;
      font-size: 0.75rem;
    }

    .total-payment {
      text-align: right;
      padding: 10px 20px;
      color: white;
    }
  `],
})
export class CheckOutButtonComponent {
  constructor(
    public orderService: OrderLocalStorageCustService,
    public derect: DerectService
  ) {}
}