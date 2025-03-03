import { Component, OnInit } from '@angular/core';
import { ProductCustService } from '../../shared/services/product-cust.service';
import { ProductCust as Product } from '../../shared/models/product-cust.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      
    `,
  ],
})
export class MenuComponent implements OnInit {
  constructor(private readonly productService: ProductCustService) {}

  products!: Product[];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching table:', error);
      },
      complete: () => {
        console.log('Observable completed');
      },
    });
  }
}
