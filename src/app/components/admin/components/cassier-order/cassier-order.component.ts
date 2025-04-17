import { Component, OnInit } from '@angular/core';
import { AdminProduct } from '../../models/admin-product.model';
import { AdminCategory } from '../../models/admin-category.model';
import { AdminTable } from '../../models/admin-table.model';
import { LoaderService } from '../../services/loader.service';
import { TableService } from '../../services/table.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { LocalStorageOrderService } from '../../services/local-storage-order.service';
import { addProductOrder, ProductOrder } from '../../models/admin-order-cassier.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderAdminService } from '../../services/order-admin.service';


@Component({
  selector: 'app-cassier-order',
  templateUrl: './cassier-order.component.html',
  styleUrls: ['./cassier-order.component.css']
})
export class CassierOrderComponent implements OnInit{

  ngOnInit(): void {
    this.loadproducts()
    this.loadtable()
    this.loadSavedProducts()
    this.selectedDiv = localStorage.getItem('selectedDiv');
  }

  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private tableService: TableService,
    private productservice: ProductService,
    private categoryservice: CategoryService,
    private localstorageorder: LocalStorageOrderService,
    private orderService: OrderAdminService
  ){
    this.orderForm = this.formBuilder.group({
          customerName: ['', Validators.required],
          type: [null, Validators.required],
          tableId: ['', Validators.required],
          adminId: ['',Validators.required] ,
          productOrders: this.formBuilder.array([])
        });
  }

  // add order
  saveorder(): Promise<void>{
    this.addProductOrder()

    // Pastikan `this.savedProducts` memiliki data sebelum digunakan
    if (!this.savedProducts || this.savedProducts.length === 0) {
        console.error("No saved products found.");
    }

    const data = localStorage.getItem('datalogin')
    const datalogin = JSON.parse(data as string);
    console.log("datalogin",datalogin[0].id)
    const addorder: any = {
      customerName: this.orderForm.get('customerName')?.value,
      type: 'dine in', //nanti diganti menggunakan fitur pilih
      tableId: this.orderForm.get('tableId')?.value,
      // adminId : '71451462-2480-41a5-8184-0bbcd523f5d6',
      adminId: datalogin[0].id,
      
      productOrders: this.savedProducts.map(product => ({
        id: product.id ?? '',
        quantity: product.quantity ?? 0
      }))
    }
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.orderService.addorder(addorder).subscribe({
        next: (response: any) => {
          if(response){

            console.log("Order saved:", response);
            this.clearlocalstorage()
            this.showsuccessToast()
            resolve(); // Selesaikan promise jika berhasil
          }else{
            console.error("Error saving order:");
            this.showErrorToast()
            this.loaderService.hideWithDelay(1000);
            reject(); // Tolak promise jika terjadi error
          }
          
        },
        error: (err: any) => {
          console.error("Error saving order:", err);
          this.showErrorToast()
          this.loaderService.hideWithDelay(1000);
          reject(err); // Tolak promise jika terjadi error
        }
      } 
    );
    this.loaderService.hideWithDelay(1000)}
);
  }

  // add order- addproductorder
  get productOrders(): FormArray {
    return this.orderForm.get('productOrders') as FormArray;
  }

  createProductOrder(id: string, quantity: number): FormGroup {
    return this.formBuilder.group({
      id: [id, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]]
    });
  }
  
  
  addProductOrder() { 
    this.savedProducts.forEach(product => {
        this.productOrders.push(this.createProductOrder(product.id?? '', product.quantity?? 0));
    });
}

  

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
          // pastikan setelah product ada panggil category
          this.loadcategory()
          console.log(this.products, "this producttt")
          // this.groupProductsByCategory()
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
            // jika category sudah di panggil saat loaderproduct,
            //  lalu panggil groupProductsByCategory untuk memastikan pengelompokan product by category
            this.groupProductsByCategory()
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
    console.log("activeCategories.length",activeCategories.length)

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
              // this.table = Response
              this.table = Response.filter(item => item.isActivated);
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
      this.localstorageorder.removeItem('selectedProducts');
      this.loadSavedProducts()
    }


    showErrorToast(): void {
      const toastElement = document.getElementById('errorToast');
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
    showsuccessToast(): void {
      const toastElement = document.getElementById('successToast');
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
    

}
