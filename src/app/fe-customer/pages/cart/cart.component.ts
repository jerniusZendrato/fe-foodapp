import { Component, OnInit } from '@angular/core';
import { OrderLocalStorageCustService } from '../../shared/services/order-local-storage-cust.service';
import {
  CustomerOrderItem,
  OrderCust as Order,
} from '../../shared/models/order-cust.model';
import { DerectService } from '../../shared/services/derect.service';
import { OrderHistoryCust } from '../../shared/models/order-history.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orderInformation: Array<{ label: string; value: string | number }> = [];
  orderPriceInfo: Array<{ label: string; value: string | number }> = [];

  order!: Order | null;

  isLoading: boolean = false;

  productOrder!: CustomerOrderItem[] | undefined;

  constructor(
    public orderService: OrderLocalStorageCustService,
    public derect: DerectService
  ) {}

  modal: any;

  ngOnInit(): void {
    this.orderInformation = [
      { label: 'Order Type', value: this.orderService.getOrderType() },
      { label: 'Table Number', value: this.orderService.getTable() },
      { label: 'Costumer', value: this.orderService.getCostumerName() },
    ];

    this.order = this.orderService.getOrder();
    this.productOrder = this.orderService.getProductOrder();
  }

  placeOrder(): void {
    if (this.orderService.getProductTotalQuantity() <= 0) {
      this.showEmptyOrderAlert();
      return;
    }

    this.isLoading = true;
    this.orderService
      .insertOrder()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            // Handle success
          } else {
            // Handle failure
          }
        },
        error: (error) => {
          // Handle error
        },
      });
  }

  updateProductOrder(): void {
    this.productOrder = this.orderService.getProductOrder();
  }

  private showEmptyOrderAlert(): void {
    // Gunakan salah satu metode berikut, tergantung library yang Anda gunakan

    // 1. Alert standar
    alert(
      'Tidak dapat memproses pesanan kosong. Silakan tambahkan produk terlebih dahulu.'
    );
  }
}
