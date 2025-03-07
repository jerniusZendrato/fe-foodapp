import { Component } from '@angular/core';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-check-out-button',
  template: `
    <div
      style="
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 85%;
    max-width: 450px;
    background-color: #ff0000
  "
      *ngIf="orderService.getProductTotalQuantity() > 0"
    >
      <button
        type="button"
        class="btn btn-red"
        style="min-width: 100%; padding: 0; border: 0;
    background-color: #ff0000
        "
        routerLink="/cart"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="icon-container"
            style="
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: black;
          border-radius: 5px;
          margin: -2px;
          height: 70px;
          width: 80px;
          position: relative;
        "
          >
            <i
              class="fa-solid fa-cart-plus fa-2xl"
              style="position: relative; color: #ff0000"
            >
              <span
                class="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-dark"
                style="font-size: 9px; margin-bottom: 40px"
              >
                {{ orderService.getProductTotalQuantity() }}
              </span>
            </i>
          </div>
          <span
            class="total-payment"
            style="text-align: right; padding: 10px 20px; color:white"
          >
            <strong>Total Payment</strong> <br />
            {{ orderService.getSubTotalPrice() }}
          </span>
        </div>
      </button>
    </div>
  `,
  styles: [``],
})
export class CheckOutButtonComponent {
  constructor(
    public orderService: OrderLocalStorageCustService,
    public derect: DerectService
  ) {}
}
