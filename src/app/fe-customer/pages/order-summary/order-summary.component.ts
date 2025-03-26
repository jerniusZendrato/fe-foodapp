import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DerectService } from 'src/app/fe-customer/shared/services/derect.service';
import { OrderLocalStorageCustService } from '../../shared/services/order-local-storage-cust.service';
import { OrderHistoryCust, OrderhistoryItemCust } from '../../shared/models/order-history.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  orderId: string | null = null;
  ordered!: OrderHistoryCust | null;
  orderedInformation: Array<{ label: string; value: string | number }> = [];
  orderedPaymentInformation: Array<{ label: string; value: string | number }> = [];
  
  constructor(
    private readonly route: ActivatedRoute,
    public order : OrderLocalStorageCustService,
    public derect: DerectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id');
    });

    this.ordered = this.order.getOrdered()

    console.log('this.ordered :>> ', this.ordered);

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
