import {
  Component,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { ProductCustService } from '../../shared/services/product-cust.service';
import { ProductCust as Product } from '../../shared/models/product-cust.model';
import { CategoryCustService } from '../../shared/services/category-cust.service';
import { CategoryCust as Category } from '../../shared/models/category-cust.model';
import { DerectService } from '../../shared/services/derect.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [``],
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly productService: ProductCustService,
    private readonly categoryService: CategoryCustService,
    public derect: DerectService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  @ViewChild('categoryNav', { static: true }) categoryNav!: ElementRef;

  @ViewChildren('categoryContainer') categoryContainers!: QueryList<ElementRef>;

  products!: Product[];
  categories!: Category[];
  searchQuery!: string;
  activeCategoryId: string | null = null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.isLoading = true;
    Promise.all([this.getProducts(), this.getCategories()]).then(() => {
      this.isLoading = false;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.setupScrollListener();
      }, 500);
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

  setActiveCategory(categoryId: string) {
    this.activeCategoryId = categoryId;
    this.scrollToCategory(categoryId);
    // this.scrollActiveCategoryIntoView();
  }

  scrollToCategory(categoryId: string) {
    this.activeCategoryId = categoryId;
    setTimeout(() => {
      const element = this.categoryContainers.find(
        (container) => container.nativeElement.id === categoryId
      );

      if (element) {
        const scrollContainer = element.nativeElement.parentElement; // Assuming the scrollable container is the parent

        if (scrollContainer) {
          // Calculate the desired scroll position
          const elementOffsetTop = element.nativeElement.offsetTop;
          const offset = 240; // Adjust this value to control how much further up you want to scroll

          // Set the scroll position directly
          scrollContainer.scrollTo({
            top: elementOffsetTop - offset,
            behavior: 'smooth',
          });
        }
      }
    });
  }

  setupScrollListener() {
    const productContainer = document.querySelector(
      'div[style*="overflow-y: auto"]'
    );
    if (productContainer) {
      productContainer.addEventListener('scroll', () => {
        this.updateActiveCategoryOnScroll(productContainer);
      });
    }
  }

  updateActiveCategoryOnScroll(container: any) {
    // Find all category containers
    const categoryElements = Array.from(
      document.querySelectorAll('.category-container')
    ) as HTMLElement[];

    // Find the one that's currently most visible in the viewport
    const containerRect = container.getBoundingClientRect();
    let closestCategory: HTMLElement | null = null;
    let closestDistance = Infinity;

    categoryElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      // Calculate distance from the top of the scroll container
      const distance = Math.abs(rect.top - containerRect.top);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCategory = element as HTMLElement; // Explicitly assert as HTMLElement
      }
    });

    // Update the active category
    if (closestCategory) {
      const newActiveCategoryId = (closestCategory as HTMLElement).id; // Ensure type assertion here
      if (
        newActiveCategoryId &&
        this.activeCategoryId !== newActiveCategoryId
      ) {
        this.activeCategoryId = newActiveCategoryId;
        this.cdr.detectChanges();
      }
    }
  }

  scrollActiveCategoryIntoView() {
    if (this.categoryNav && this.activeCategoryId) {
      const categoryNavElement = this.categoryNav.nativeElement as HTMLElement;
      const activeCategoryElement = categoryNavElement.querySelector(
        '.active-category'
      ) as HTMLElement;

      if (activeCategoryElement) {
        const offsetLeft = activeCategoryElement.offsetLeft;
        console.log('offsetLeft :>> ', offsetLeft);
        categoryNavElement.scrollTo({
          left: offsetLeft,
          behavior: 'smooth',
        });
      }
    }
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
      complete: () => {},
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
      complete: () => {},
    });
  }
}
