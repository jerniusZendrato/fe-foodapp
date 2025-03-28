import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderLocalStorageCustService } from '../../shared/services/order-local-storage-cust.service';
import {
  CustomerOrderItem,
  OrderCust as Order,
} from '../../shared/models/order-cust.model';
import { DerectService } from '../../shared/services/derect.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('processModal', { static: false }) processModal!: ElementRef;

  orderInformation: Array<{ label: string; value: string | number }> = [];
  orderPriceInfo: Array<{ label: string; value: string | number }> = [];

  order!: Order | null;

  isLoading: boolean = false;

  productOrder!: CustomerOrderItem[] | undefined;

  constructor(
    public orderService: OrderLocalStorageCustService,
    public derect: DerectService
  ) { }

  ngOnInit(): void {
    this.orderInformation = [
      { label: 'Order Type', value: this.orderService.getOrderType() },
      { label: 'Table Number', value: this.orderService.getTable() },
      { label: 'Costumer', value: this.orderService.getCostumerName() },
      { label: 'Payment Method', value: "Pay at the cashier" },
    ];

    this.order = this.orderService.getOrder();
    this.productOrder = this.orderService.getProductOrder();
  }

  placeOrder(): void {
    if (!this.orderService.isOrderValid()) {
      this.showAlert();
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

  private showAlert(): void {
    alert(`Tidak dapat memproses pesanan. kemungkinan kesalahan :
Silakan tambahkan produk terlebih dahulu. 
Pesanan tidak boleh kosong. 
Meja tidak boleh kosong. 
Nama pelanggan tidak boleh kosong.`);
  }



  updateProductOrder(): void {
    this.productOrder = this.orderService.getProductOrder();
  }

  @ViewChild('ProssesOrderModal', { static: false }) ProssesOrderModal!: ModalComponent;
  @ViewChild('errorModal', { static: false }) errorModal!: ModalComponent;

  openProssesOrderModal() {
    this.ProssesOrderModal.openModal();
  }

  handleConfirm() {
    console.log('Confirmed');
  }

  handleCancel() {
    console.log('Canceled');
  }

  showErrorModal(message: string): void {
    this.errorModal.openModal();
  }

}
