import { Component, OnInit } from '@angular/core';
import { OrderHistoryCust } from '../../shared/models/order-history.model';
import { OrderCustService } from '../../shared/services/order-cust.service';
import { ActivatedRoute } from '@angular/router';
import { DerectService } from '../../shared/services/derect.service';

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
  ordered!: OrderHistoryCust;
  orderId!: string | null; // Mengizinkan null

  orderedInformation: Array<{ label: string; value: string | number }> = [];
  orderedPaymentInformation: Array<{ label: string; value: string | number }> = [];

  constructor(
    private readonly orderService: OrderCustService,
    private route: ActivatedRoute,
    public derect: DerectService

  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    if (this.orderId) {
      this.orderService.getOrder(this.orderId).subscribe({
        next: (response) => {
          this.ordered = response.data;
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
    this.orderedInformation = [
      {
        label: this.ordered?.createdAt
          ? new Date(this.ordered.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          }) + ', ' + new Date(this.ordered.createdAt).toLocaleTimeString('en-GB', {
            hour: '2-digit', minute: '2-digit'
          })
          : '-',
        value: this.ordered?.code ? "#" + this.ordered.code : '-'
      },
      { label: 'Order Type', value: this.ordered?.type ?? '-' },
      { label: 'Table Number', value: this.ordered?.tableName ?? '-' },
      { label: 'Cashier Name', value: this.ordered?.adminName ?? '-' },
      { label: 'Costumer Name', value: this.ordered?.customerName ?? '-' },
      { label: 'Payment Method', value: "Pay at the cashier" },
    ];

    this.orderedPaymentInformation = [
      { label: 'Subtotal', value: this.ordered?.subTotalPrice ? this.ordered.subTotalPrice : '-' },
      { label: 'Tax', value: this.ordered?.tax ? this.ordered.tax : '-' },
      { label: 'Total Payment', value: this.ordered?.totalPrice ? this.ordered.totalPrice : '-' },
    ];
  }
}
