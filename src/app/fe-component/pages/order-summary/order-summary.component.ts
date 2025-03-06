import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DerectService } from 'src/app/fe-customer/shared/services/derect.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  orderId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    public derect: DerectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id');
    });
  }
}
