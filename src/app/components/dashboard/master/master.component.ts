import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductsByCategory } from 'src/app/models/products-by-category.model';
import { CategoryService } from 'src/app/service/category.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductService } from 'src/app/service/product.service';


// import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  modalService: any;
  isSecondCheckboxDisabled = true;

  constructor(
    private productservice: ProductService,
    private categoryservice: CategoryService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
    
  ) { }

  public product: Product[] = []
  public products: Product[] = []
  public productsbycategory: ProductsByCategory[] = []
  public category: Category[] = []

  public groupedProducts: { [key: string]: Product[] } = {};


  //variabel unutk menjadi parameter 
  //memunculkan product berdasarkan kategory
  public onecategory: string = ''
  public datacategory: string = this.onecategory;
  private categoriesSubject = new BehaviorSubject<any[]>([]); // Observable categories
  categories$ = this.categoriesSubject.asObservable(); 

  // variabel edit
  productToEdit: Product | null = null;

    // variabel save
  productToSave: Product[]  = [];

  categories: any[] = [];

  isLoading: boolean = false;
  


  

  async ngOnInit() {
    await this.loadcategory(); // Tunggu hingga loadCategory selesai
    // console.log(this.onecategory)
    // this.loadproduct(this.onecategory); // Panggil loadProduct setelahnya
    await this.loadproducts();
    console.log("cek products aja",this.products)
    this.groupProductsByCategory()

  }

  

  



  // onButtonClick(event: Event): void {
  //   const buttonId = (event.target as HTMLButtonElement).id;
  //   this.datacategory = buttonId;
  //   this.loadproduct(this.datacategory)
  // }
  editstatusproduct(event:Event):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isSecondCheckboxDisabled = !isChecked;
  }

  onEditProduct(product:Product) :void{
    this.productToEdit = product;
    console.log(this.productToEdit)
  }

  isDisabled: boolean = true; // Status awal ( disable)

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    console.log("cek 123456") // Toggle status
  }

  // buttonsaveproduct() :void{
  //   this.productToSave = [...this.product];
  //   console.log(this.productToSave)

  //   this.loaderService.show(); 
  //   this.productservice.saveProducts(this.productToSave).subscribe(
  //     (response) => {
  //       if (response['isSuccess']==true) {
  //         console.log('All products saved successfully',response);
  //       } else {
  //         console.error('Failed to save products');
  //       }
  //       this.loaderService.hideWithDelay(2000);
  //     },
  //     (error) => {
  //       console.error('Error saving products:', error);
  //       this.loaderService.hideWithDelay(2000);
  //     }
  //   );
  // }



  loadcategory(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loaderService.show(); 
      this.categoryservice.getcategory().subscribe(
        (Response: Category[]) => {
          if (Response) {
            this.category = Response
            this.categories = Response.map(category => ({
              ...category,
              checked: false // Set default checked ke `false`
            }));

            this.onecategory = this.category[0]['name']
            console.log("ini this.category",this.categories)
            this.loaderService.hideWithDelay(1000);
            resolve();
          }
          else
            console.log("data tidak isSuccess=true")
            this.loaderService.hideWithDelay(1000);
          reject()
        }
      )
    });
  }

  removeTag(tag: any): void {
    tag.checked = false;
    this.groupProductsByCategory();

  }

  loadproduct(buttonId: string): void {
    // this.loaderService.show();
    this.productservice.getproduct().subscribe(
      (Response: Product[]) => {
        if (Response) {
          this.product = Response.filter(product => product.category === buttonId)
          
          console.log(Response, "this producttt", buttonId)
        }
        else
          console.log("data tidak isSuccess=true")
      }
    )
  }

  loadproducts(): Promise<void> {
    return new Promise((resolve, reject) => {
    this.productservice.getproduct().subscribe(
      (Response: Product[]) => {
        if (Response) {
          this.products = Response
          console.log(this.products, "this producttt")
          resolve();
        }
        else
          console.log("data tidak isSuccess=true")
          reject()
      }
    )
  })
}

// groupProductsByCategory() {
//   this.groupedProducts = this.products.reduce((grouped: any, product: any) => {
//     (grouped[product.category] = grouped[product.category] || []).push(product);
//     return grouped;
//   }, {});
// }


groupProductsByCategory(): void {
  const activeCategories = this.categories
    .filter(category => category.checked)
    .map(category => category.name);

  const filteredProducts = activeCategories.length > 0
    ? this.products.filter(product => activeCategories.includes(product.category))
    : this.products;

  this.groupedProducts = filteredProducts.reduce((grouped: any, product: any) => {
    (grouped[product.category] = grouped[product.category] || []).push(product);
    return grouped;
  }, {});}

  // search menu------------------------------------------------
  searchKeyword: string = '';
  filteredGroupedProducts: { [key: string]: any[] } = {};

  filterGroupedProducts(): void {
    const keyword = this.searchKeyword.toLowerCase();

    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );

    this.filteredGroupedProducts = filteredProducts.reduce((grouped: any, product: any) => {
      (grouped[product.category] = grouped[product.category] || []).push(product);
      return grouped;
    }, {});
  }

  // menu simpan gambar..................

  previewUrl: string | ArrayBuffer | null = null;
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result; // Simpan URL pratinjau ke variabel
      };

      reader.readAsDataURL(file); // Baca file sebagai Data URL
    }
  }


// ProductsByCategory() : Promise<void>{
//   return new Promise((resolve, reject) => {
//     this.productbycategoryservice.getProductsbycategory().subscribe(
//       (Response: ProductsByCategory[]) => {
//         if (Response) {
//           this.productsbycategory = Response
//           console.log(Response, "this producttt")
//           resolve();
//         }
//         else
//           console.log("data tidak isSuccess=true")
//           reject()
//       }  

//     )

//   })
// }


}
