import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/components/costomer/service/order.service';

interface OrderInfo {
  key : string;
  value : any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  orders: Order = { userName: '19282bbd-b7a6-48f8-9ef4-b62aace832aa', productOrders: [] };

  orderInfo: OrderInfo[] | undefined;
  orderInfoPayment: OrderInfo[] | undefined;

  constructor(
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.orders = this.orderService.getOrder() || this.orders; ;

    this.orderInfo = [
      {
        key: 'Order Type',
        value: 'Dinning Table',
      },
      {
        key: 'Table Number',
        value: this.orderService.getTableNo(),
      },
      {
        key: 'Costumer',
        value: this.orderService.getCustomerName(),
      }
    ]

    this.orderInfoPayment = [
      {
        key: 'Subtotal',
        value: this.orderService.getTotalPrice(),
      },
      {
        key: 'Tax (10%)',
        value: this.orderService.getTax(),
      },
      {
        key: 'Total',
        value: this.orderService.getTotalTotalPrice(),
      }
    ]
  }

  saveOrder(){
    console.log('mauk di save orpder :>> ');
    this.orderService.saveOrder().subscribe(response => {
      console.log('Response from saveOrder:', response);
    });
  }
}
