import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/components/costumer/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  orders: Order = { userName: '19282bbd-b7a6-48f8-9ef4-b62aace832aa', productOrders: [] };


  constructor(
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.orders = this.orderService.getOrder() || this.orders; ;
  }

  saveOrder(){
    console.log('mauk di save orpder :>> ');
    this.orderService.saveOrder().subscribe(response => {
      console.log('Response from saveOrder:', response);
    });
  }
}
