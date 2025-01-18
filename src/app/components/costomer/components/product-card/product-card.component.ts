import { Component, Input } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product!: any;


  constructor(public orderService: OrderService) {} 
}
