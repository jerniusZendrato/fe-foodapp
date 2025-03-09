import { Component, OnInit } from '@angular/core';
import { OrderLocalStorageCustService } from '../../shared/services/order-local-storage-cust.service';
import { OrderHistoryCust } from '../../shared/models/order-history.model';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  constructor(
    private readonly orderService: OrderLocalStorageCustService,
  ) {}

  orderHistories!: OrderHistoryCust[] | null;

  ngOnInit(): void {
    this.orderHistories = this.orderService.getHistoryOrder();
  }
}
