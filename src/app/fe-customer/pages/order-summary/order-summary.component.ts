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
  }
}
