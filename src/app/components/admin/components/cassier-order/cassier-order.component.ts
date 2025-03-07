import { Component, OnInit } from '@angular/core';
import { AdminProduct } from '../../models/admin-product.model';
import { AdminCategory } from '../../models/admin-category.model';
import { AdminTable } from '../../models/admin-table.model';
import { LoaderService } from '../../services/loader.service';
import { TableService } from '../../services/table.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { LocalStorageOrderService } from '../../services/local-storage-order.service';
import { ProductOrder } from '../../models/admin-order-cassier.model';

@Component({
  selector: 'app-cassier-order',
  templateUrl: './cassier-order.component.html',
  styleUrls: ['./cassier-order.component.css']
})
export class CassierOrderComponent implements OnInit{

  ngOnInit(): void {
    this.loadcategory()
    this.groupProductsByCategory()
    this.loadproducts()
    this.loadtable()
    this.loadSavedProducts()
    this.selectedDiv = localStorage.getItem('selectedDiv');
  }

  constructor(
    private loaderService: LoaderService,
    private tableService: TableService,
    private productservice: ProductService,
    private categoryservice: CategoryService,
    private localstorageorder: LocalStorageOrderService
  ){}

  public datacategory: AdminCategory[] = []
  selectedDiv: string | null = null;

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
  }

  loadproducts(): Promise<void> {
    return new Promise((resolve, reject) => {
    this.productservice.getproduct().subscribe(
      (Response: AdminProduct[]) => {
        if (Response) {
          this.products = Response
          console.log(this.products, "this producttt")
          this.groupProductsByCategory()
          resolve();
        }
        else
          console.log("data tidak isSuccess=true")
          reject()
      }
    )
  })
}

  loadcategory(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.categoryservice.getcategory().subscribe(
        (Response: AdminCategory[]) => {
          if (Response) {
            this.datacategory = Response
            console.log("ini category", this.datacategory)
            // this.groupProductsByCategory()
            this.loaderService.hideWithDelay(1000);
            resolve();
          }
          else
            console.log("data tidak isSuccess=true")
            this.loaderService.hideWithDelay(1000);
          reject()
        }

      )
    })
  }


  public products: AdminProduct[] = []
  public groupedProducts: { [key: string]: AdminProduct[] } = {};

  groupProductsByCategory(): void {

    const activeCategories = this.datacategory
    .filter(category => category.isActivated)
    .map(category => category.name);

    // cek apakah di roduct memiliki kategory aktif 
    // jika ia maka masukkan data tersebut ke filteredProducts
    const filteredProducts = activeCategories.length > 0
    ? this.products.filter(product => product.category && activeCategories.includes(product.category))
    : [];

    console.log("filteredProducts",filteredProducts)
    this.groupedProducts = filteredProducts.reduce((grouped: any, product: any) => {
      (grouped[product.category] = grouped[product.category] || []).push(product);
      return grouped;
      
    }, {})
    console.log (" this.groupedProducts", this.groupedProducts)
    
    ;}

    public table: AdminTable[] = []
    loadtable(): Promise<void>{
      return new Promise((resolve, reject) => {
        this.loaderService.show();
        this.tableService.gettable().subscribe(
          (Response: AdminTable[]) => {
            if (Response) {
              this.table = Response
              console.log("ini table", this.table)
              this.loaderService.hideWithDelay(1000);
              resolve();
            }
            else
              console.log("data tidak isSuccess=true")
              this.loaderService.hideWithDelay(1000);
            reject()
          }
  
        )
      })
    }


    selectedProduct: ProductOrder | null = null;

    selectProduct(product: ProductOrder) {
      this.selectedProduct = product;
      this.localstorageorder.saveSelectedProduct(product);
      this.loadSavedProducts()
    }

    loadhapusProducts(product: ProductOrder) {
      this.localstorageorder.removeSelectedProduct(product);
      this.loadSavedProducts()
    }

    savedProducts: ProductOrder[] = [];
    totalhargaorder= 0

    loadSavedProducts() {
      this.savedProducts = this.localstorageorder.getSavedProducts();
      // this.totalhargaorder = sum(savedProducts.price)
      this.totalhargaorder = this.savedProducts.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);

    }


    clearlocalstorage(){
      this.localstorageorder.clear()
      this.loadSavedProducts()
    }
    

}
