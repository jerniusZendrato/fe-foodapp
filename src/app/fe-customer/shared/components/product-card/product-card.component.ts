import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderLocalStorageCustService } from "../../services/order-local-storage-cust.service";
import { ProductCust } from "../../models/product-cust.model";

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
                (click)="incrementQuantity(product)"
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
                (click)="decrementQuantity(product)"
              >
                -
              </button>
              <span class="quantity-display">
                {{ order.getProductQuantity(product.id) }}
              </span>
              <button
                class="rounded-button"
                (click)="incrementQuantity(product)"
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
        padding: 12px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .product-card__content {
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 16px;
        align-items: start;
      }

      .product-card__image-container {
        width: 80px;
        height: 80px;
      }

      .product-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }

      .product-card__details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .product-card__name {
        margin: 0 0 8px 0;
        font-size: 1.1rem;
        font-weight: bold;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product-card__description {
        margin: 0 0 8px 0;
        font-size: 0.9rem;
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .product-card__price-and-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .product-card__price {
        font-size: 1rem;
        color: #e91e63;
      }

      .product-card__add-button {
        font-size: 0.9rem;
        border: 2px solid #e91e63;
        color: #e91e63;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        padding: 4px 8px;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .product-card__add-button:hover {
        background-color: #e91e63;
        color: white;
      }

      .rounded-button {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid #e91e63;
        font-size: 0.5rem;
        font-weight: bold;
        color: #e91e63;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .rounded-button:hover {
        background-color: #e91e63;
        color: white;
      }

      .quantity-display {
        font-size: 0.9rem;
        color: #e91e63;
        text-align: center;
        padding: 0 8px;
      }

      .quantity-container {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 4px;
        background-color: #f9f9f9;
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() product!: any;
  @Output() updateProductOrder = new EventEmitter<void>();

  constructor(public order: OrderLocalStorageCustService) {}

  incrementQuantity(product: ProductCust) {
    this.order.incrementQuantity(product);
  }

  decrementQuantity(product: ProductCust) {
    this.order.decrementQuantity(product);
    if (product.quantity == 0) {
      this.updateProductOrder.emit();
    }
  }

}