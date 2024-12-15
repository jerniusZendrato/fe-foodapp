import { Component, HostListener } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Order } from 'src/app/models/order.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  categories?: Category[];
  products: Product[] = [];
  order: Order = { userId: '19282bbd-b7a6-48f8-9ef4-b62aace832aa', productOrders: [] };

  cartItemCount = 0;
  totalPrice = 0;

  activeCategoryId: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    console.log('ngOnInit :>> ');
    this.getCategory();
    this.getProducts();
    this.order = this.orderService.getOrder() || this.order;
    this.updateData();
    
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.categories = response.data.map((category: any) => ({
            ...category,
          }));
        }
      },
      (error: any) => {
        alert('Oops, something went wrong!');
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.products = response.data.map((product: any) => ({
            ...product,
          }));
        }
      },
      (error: any) => {
        console.error('Error fetching products:', error);
        alert('Error fetching products');
      }
    );
  }

  placeOrder() {
    this.orderService.addOrder(this.order);
    console.log('Order placed:', this.order); // Untuk debugging
  }

  decreaseQuantity(product: Product) {
    // Check if the product is already in the cart
    const existingProduct = this.order?.productOrders.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity < 1) {
        this.order.productOrders = this.order.productOrders.filter(
          (item) => item.id !== product.id
        );
      }
    }

    console.log('this.order :>> ', this.order);
    this.updateData()
  }

  increaseQuantity(product: Product) {
    // Check if the product is already in the cart
    const existingProduct = this.order?.productOrders.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.order?.productOrders.push({
        id: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        urlImage: product.urlImage
      });
    }
    console.log('this.order :>> ', this.order);
    this.updateData()
  }

  getProductQuantity(productId: string): number {
    const productOrder = this.order.productOrders.find(
      (item) => item.id === productId
    );
    return productOrder ? productOrder.quantity : 0;
  }
  // end - service

  formatPriceToRupiah(price: number): string {
    const rupiah = (number: number) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(number);
    };

    return rupiah(price);
  }

  // cosmetic service

  scrollToCategory(categoryId: string) {
    const element = document.getElementById(categoryId);
    const headerOffset = 100; // Adjust this value based on your header height
    const elementPosition = element ? element.getBoundingClientRect().top : 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    this.activeCategoryId = null;
    if (element) {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      this.activeCategoryId = categoryId;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY + 160; // Adjust for header height
    let foundActiveCategory = false;

    // this.categorys.forEach(category => {
    //   const element = document.getElementById(category.categoryId);
    //   if (element) {
    //     const elementTop = element.getBoundingClientRect().top + window.scrollY;
    //     const elementBottom = elementTop +  ((element.offsetHeight));

    //     // Check if the scroll position is within the bounds of the category element
    //     if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
    //       this.activeCategoryId = category.categoryId;
    //       foundActiveCategory = true; // Mark that we found an active category
    //     }
    //   }
    // });

    // If no category is found in view, reset activeCategoryId
    if (!foundActiveCategory) {
      this.activeCategoryId = null;
    }
    console.log('this.activeCategoryId :>> ', this.activeCategoryId);
  }



  updateData(){
    this.cartItemCount = this.order.productOrders.length;
    this.order.totalPrice = this.order.productOrders.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}
