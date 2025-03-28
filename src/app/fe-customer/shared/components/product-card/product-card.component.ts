import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderLocalStorageCustService } from '../../services/order-local-storage-cust.service';
import { ProductCust } from '../../models/product-cust.model';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <div class="product-card__content">
        <div class="product-card__image-container">
          <img
            *ngIf="displayImage"
            class="product-card__image"
            [src]="product.urlImage"
            [alt]="product.name"
          />
        </div>
        <div class="product-card__details">
          <h3 class="product-card__name">{{ product.name }}</h3>
          <p class="product-card__description">{{ product.description }}</p>
          <div *ngIf="isEdited" class="product-card__price-and-button">
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

          <div class="product-ordered-card__price-and-button" *ngIf="!isEdited">
            <span class="quantity-display-ordered">
              {{ order.getProductQuantity(product.id) }}
            </span>
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
        display: flex;
        gap: 16px;
        align-items: start;
      }

      .product-card__image-container {
        flex-shrink: 0;
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
        flex-grow: 1;
        min-width: 0; /* Mencegah nama produk melebarkan parent */
      }

      .product-card__name {
        font-size: 1rem;
        font-weight: bold;
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Batas dua baris */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product-card__description {
        font-size: 0.8rem;
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
        gap: 8px;
        min-width: 0; /* Pastikan elemen tidak melebar */
        flex-wrap: wrap;
      }

      .product-card__price {
        font-size: 1rem;
        color: #e91e63;
        flex-shrink: 0; /* Hindari harga menyusut */
      }

      .product-ordered-card__price-and-button {
        display: flex;
        justify-content: flex-end; /* Memastikan elemen di dalamnya rata kanan */
        align-items: center;
        gap: 8px;
        min-width: 0;
        flex-wrap: wrap;
      }
      
      .quantity-display-ordered {
        margin-left: auto; /* Dorong elemen ke kanan */
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
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid #e91e63;
        font-size: 1rem;
        font-weight: bold;
        color: #e91e63;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .rounded-button:hover {
        background-color: #e91e63;
        color: white;
      }

      .quantity-display {
        font-size: 1rem;
        font-weight: bold;
        color: #e91e63;
        text-align: center;
        padding: 0 8px;
      }

      .quantity-container {
        display: flex;
        align-items: center;
        border-radius: 4px;
        padding: 4px;
        background-color: #f9f9f9;
      }
    `,
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: any;
  @Input() isEdited: Boolean = true;
  @Input() displayImage: Boolean = true;
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

  ngOnInit() {}
}
