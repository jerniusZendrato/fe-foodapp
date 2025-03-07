import { Component } from '@angular/core';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-check-out-button',
  template: `
    <div
      class="checkout-container"
      *ngIf="orderService.getProductTotalQuantity() > 0"
    >
      <button type="button" class="checkout-button" routerLink="/cart">
        <div class="button-content">
          <div class="cart-icon-container">
            <i class="fa-solid fa-cart-plus fa-xl">
              <span class="item-count">
                {{ orderService.getProductTotalQuantity() }}
              </span>
            </i>
          </div>
          <div
            class="price-container d-flex"
            style="justify-content: flex-end; text-align: right; width: 100%;"
          >
            <span class="label" style="margin-right: 8px;">Total Payment</span>
            <span class="price">{{
              orderService.getSubTotalPrice() | currency : 'Rp'
            }}</span>
          </div>
        </div>
      </button>
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
        transition: all 0.3s ease;
      }

      .checkout-button {
        width: 100%;
        padding: 0;
        border: 0;
        background: linear-gradient(135deg, #ff3a3a, #ff0000);
        transition: all 0.3s ease;
      }

      .checkout-button:hover {
        background: linear-gradient(135deg, #ff5252, #ff1a1a);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2);
      }

      .button-content {
        display: flex;
        align-items: center;
        height: 70px;
      }

      .cart-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        height: 70px;
        min-width: 80px;
        position: relative;
      }

      .cart-icon-container i {
        color: #ff0000;
        position: relative;
      }

      .item-count {
        position: absolute;
        top: -8px;
        right: -12px;
        background-color: #212121;
        color: white;
        font-size: 11px;
        font-weight: bold;
        height: 22px;
        width: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .price-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        color: white;
        text-align: left;
      }

      .label {
        font-size: 14px;
        opacity: 0.9;
        font-weight: 500;
      }

      .price {
        font-size: 18px;
        font-weight: 700;
      }

      .arrow-container {
        margin-right: 16px;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: white;
      }
    `,
  ],
})
export class CheckOutButtonComponent {
  constructor(
    public orderService: OrderLocalStorageCustService,
    public derect: DerectService
  ) {}
}
