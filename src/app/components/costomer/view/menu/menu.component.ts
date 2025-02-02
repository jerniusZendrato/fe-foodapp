import { Component, HostListener } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Order } from 'src/app/models/order.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/components/costomer/service/order-costomer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  categories?: Category[];
  products: Product[] = [];

  cartItemCount = 0;
  totalPrice = 0;

  searchQuery: string = ''; 

  activeCategoryId: string | null = '4b8b5862-1c37-4d4b-9adf-f34c5c3c9a96';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.getCategory();
    this.getProducts();
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

  // end - service

  filterProductsBySearch(): Product[] {
    if (!this.searchQuery) {
      return this.products; // Jika tidak ada input pencarian, tampilkan semua produk
    }
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

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
    const headerOffset = 160; // Adjust this value based on your header height
    const elementPosition = element ? element.getBoundingClientRect().top : 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    this.activeCategoryId = null;
    if (element) {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      this.activeCategoryId = categoryId;
      console.log(categoryId);
      // this.activeCategoryId = '4b8b5862-1c37-4d4b-9adf-f34c5c3c9a96';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY + 165; // Sesuaikan untuk tinggi header
    let foundActiveCategory = false;

    if (this.categories) {
      // Pastikan categories sudah terisi
      this.categories.forEach((category) => {
        const element = document.getElementById(category.id);

        if (element) {
          const elementTop =
            element.getBoundingClientRect().top + window.scrollY;
          const elementBottom = elementTop + element.offsetHeight;

          // Periksa apakah posisi scroll berada dalam batas elemen kategori
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            this.activeCategoryId = category.id;
            foundActiveCategory = true; // Tandai bahwa kita menemukan kategori aktif
          }
        }
      });

    }

    // Jika tidak ada kategori yang ditemukan dalam tampilan, reset activeCategoryId
    if (!foundActiveCategory) {
      this.activeCategoryId = null;

    }
  }
}
