import { Component, ElementRef, OnInit, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { ProductCustService } from '../../shared/services/product-cust.service';
import { ProductCust as Product } from '../../shared/models/product-cust.model';
import { CategoryCustService } from '../../shared/services/category-cust.service';
import { CategoryCust as Category } from '../../shared/models/category-cust.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [``],
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly productService: ProductCustService,
    private readonly categoryService: CategoryCustService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  @ViewChildren('categoryContainer') categoryContainers!: QueryList<ElementRef>;

  products!: Product[];
  categories!: Category[];
  searchQuery! : string;

  isLoading: boolean = true;

  ngOnInit(): void {
    this.isLoading = true;
    Promise.all([
      this.getProducts(),
      this.getCategories()
    ]).then(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });

  }

  activeCategoryId: string | null = null;

  scrollToCategory(categoryId: string) {
    setTimeout(() => {
      const element = this.categoryContainers.find(
        (container) => container.nativeElement.id === categoryId
      );
      if (element) {
        element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  filterProductsBySearch(): Product[] {
    this.isLoading = true;
  
    let filteredProducts: Product[];
  
    if (!this.searchQuery) {
      filteredProducts = this.products;
    } else {
      filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
    this.isLoading = false;
    return filteredProducts;
  }


  // ----------------------------------------  crud to service
  getProducts() {
    this.isLoading = true; // Mulai loading
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false; // Selesai loading
        this.cdr.detectChanges(); // Memicu deteksi perubahan
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false; // Pastikan loading dimatikan jika terjadi error
        this.cdr.detectChanges(); // Memicu deteksi perubahan
      },
      complete: () => {
      },
    });
  }

  getCategories() {
    this.isLoading = true; // Mulai loading
    this.categoryService.getCategories().subscribe({
      next: (category) => {
        this.categories = category;
        this.isLoading = false; // Selesai loading
        this.cdr.detectChanges(); // Memicu deteksi perubahan
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.isLoading = false; // Pastikan loading dimatikan jika terjadi error
        this.cdr.detectChanges(); // Memicu deteksi perubahan
      },
      complete: () => {
      },
    });
  }
}
