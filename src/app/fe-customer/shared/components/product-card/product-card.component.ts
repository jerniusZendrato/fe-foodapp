import { Component, Input } from '@angular/core';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <div class="product-card__content">
        <div class="product-card__image-container">
          <img
            class="product-card__image"
            [src]="product.urlImage"
            [alt]="product.name"
          />
        </div>
        <div class="product-card__details">
          <h3 class="product-card__name">{{ product.name }}</h3>
          <p class="product-card__description">{{ product.description }}</p>
          <div class="product-card__price-and-button">
            <span class="product-card__price">
              <strong>{{ product.price | currency : 'Rp' }}</strong>
            </span>
            <div *ngIf="order.getProductQuantity(product.id) == 0">
              <button
                (click)="order.incrementQuantity(product)"
                class="product-card__add-button"
              >
                Add
              </button>
            </div>
            <div
              *ngIf="order.getProductQuantity(product.id) != 0"
              class="quantity-container"
            >
              <button
                class="rounded-button"
                (click)="order.decrementQuantity(product)"
              >
                -
              </button>
              <span class="quantity-display mx-1">
                {{ order.getProductQuantity(product.id) }}
              </span>
              <button
                class="rounded-button"
                (click)="order.incrementQuantity(product)"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        width: 100%;
        max-width: 500px;
        padding: 6px 0px;
        border: 0.5px solid #fefefe;
        border-bottom: 0.1px solid rgb(218, 216, 216);
      }

      .product-card__content {
        display: grid;
        grid-template-columns: 72px 1fr;
        grid-template-rows: auto;
        gap: 16px;
        align-items: start;
      }

      .product-card__image-container {
        width: 72px;
        height: 72px;
        grid-column: 1;
        grid-row: 1;
      }

      .product-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }

      .product-card__details {
        grid-column: 2;
        grid-row: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .product-card__name {
        margin: 0 0 4px 0;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product-card__description {
        margin: 0 0 4px 0;
        font-size: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
      }

      .product-card__price-and-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
      }

      .product-card__price {
        font-size: 14px;
      }

      .product-card__add-button {
        font-size: 10px;
        border: 2px solid #ff0000; /* Border merah */
        color: #ff0000;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
      }

      .rounded-button {
        width: 20px; /* Ukuran dikurangi */
        height: 20px; /* Ukuran dikurangi */
        border-radius: 50%;
        background-color: white;
        border: 2px solid #ff0000; /* Border merah */
        font-size: 10px; /* Ukuran font dikurangi */
        font-weight: bold;
        color: #ff0000; /* Warna teks merah */
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 3px; /* Margin dikurangi */
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .rounded-button:hover {
        background-color: #ff0000;
        color: white;
      }

      .rounded-button:active {
        background-color: #cc0000; /* Warna merah yang lebih gelap saat ditekan */
        color: white;
      }

      .quantity-display {
        font-size: 12px;
        color: #ff0000;
        text-align: center;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15%;
        border: 1px solid #ff0000;
      }

      .quantity-container {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 2px;
        background-color: white;
        width: 100px; /* Atur lebar sesuai kebutuhan */
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product!: any;

  constructor(public order: OrderLocalStorageCustService) {}
}
