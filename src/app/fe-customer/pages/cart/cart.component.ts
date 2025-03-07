import { Component, OnInit } from '@angular/core';
import { OrderLocalStorageCustService } from '../../shared/services/order-local-storage-cust.service';
import { OrderCust as Order } from '../../shared/models/order-cust.model';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit  {
  orderInformation: Array<{ label: string; value: string | number }> = [];
  orderPriceInfo: Array<{ label: string; value: string | number }> = [];

  order!: Order | null;

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
    this.orderPriceInfo = [
      { label: 'Sub Total', value: this.orderService.getSubTotalPrice() },
      { label: 'Tax (10%)', value: this.orderService.getTax() },
      { label: 'Total', value: this.orderService.getTotatPrice() },
    ];

    this.order = this.orderService.getOrder();
  }
}
