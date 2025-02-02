import { Component, Input } from '@angular/core';
import { OrderService } from '../../service/order-costomer.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  @Input()
  product!: any;

  constructor(public orderService: OrderService) {}

  isCookFinished: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isCookFinished = true;
    }, 2500); // 5000 milliseconds = 5 seconds
  }
}
