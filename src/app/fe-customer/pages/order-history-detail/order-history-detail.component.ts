import { Component, OnInit } from '@angular/core';
import { OrderHistoryCust } from '../../shared/models/order-history.model';
import { OrderCustService } from '../../shared/services/order-cust.service';
import { ActivatedRoute } from '@angular/router';

interface OrderInformation {
  label: string;
  value: any;
}

@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.css'],
})
export class OrderHistoryDetailComponent implements OnInit {
  order!: OrderHistoryCust;
  orderId!: string | null; // Mengizinkan null
  orderInformation!: OrderInformation[];

  constructor(
    private readonly orderService: OrderCustService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    if (this.orderId) {
      this.orderService.getOrder(this.orderId).subscribe({
        next: (response) => {
          this.order = response.data;
          this.initializeOrderInformation();
        },
        error: (error) => {
          // Tangani error
        },
      });
    } else {
      // Tangani kasus ketika orderId adalah null
    }
  }

  private initializeOrderInformation(): void {
    this.orderInformation = [
      { label: 'Order Type', value: this.order.type },
      { label: 'Table Number', value: this.order.tableName },
      { label: 'Cashier', value: this.order.adminName },
      { label: 'Customer', value: this.order.customerName },
      { label: 'Payment Method', value: 'Pay at cashier' },
    ];
  }
}
