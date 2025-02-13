import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/unsaved-changes-verifikasi.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductsByCategory } from 'src/app/models/products-by-category.model';
import { CategoryService } from 'src/app/service/category.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit, CanComponentDeactivate {

  modalService: any;
  // isSecondCheckboxDisabled = true;



  productForm: FormGroup;
  visible: boolean = false;
  productName: string | undefined;
  selectedCategory: Category | undefined;
  // categories?: Category[];
  image: File | null = null;

  
  constructor(
    private formBuilder: FormBuilder,
    private productservice: ProductService,
    private categoryservice: CategoryService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
    
  ) { 
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [null, Validators.required],
      price: ['', Validators.required],
      image: [''],
      description: [''],
      isActivated: [true],
    });
  }

  public product: Product[] = []
  public products: Product[] = []
  public productsbycategory: ProductsByCategory[] = []
  public category: Category[] = []

  public groupedProducts: { [key: string]: Product[] } = {};


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
  // Properti untuk menyimpan data awal
  originalProducts: any[] = [];


  

  async ngOnInit() {
    await this.loadcategory(); // Tunggu hingga loadCategory selesai

    await this.loadproducts();
    this.dataproductawal()
    this.groupProductsByCategory()   
    this.cekperubahan()
    
    console.log("originalProducts",this.originalProducts)

  }

  public originalGroupedProducts: { [key: string]: Product[] } = {};
  dataproductawal(){
    this.originalProducts = Object.values(this.groupedProducts).flat().map(product => ({
      ...product, // Salin semua properti
      isActivated: product.isActivated // Simpan status awal
  
      }));
      // this.originalGroupedProducts = { ...this.groupedProducts };
      this.originalGroupedProducts = JSON.parse(JSON.stringify(this.groupedProducts));
      console.log("ini data originalGroupedProducts",this.originalGroupedProducts)
  }
  

  // editstatusproduct(event:Event):void{
  //   const isChecked = (event.target as HTMLInputElement).checked;

   
  //   this.isSecondCheckboxDisabled = !isChecked;
  //   if (!isChecked) {
  //     this.cekstatus();  // Menjalankan fungsi cekstatus jika checkbox unchecked
  //   }

  // }

  onEditProduct(product:Product) :void{
    this.productToEdit = product;
    console.log(this.productToEdit)
  }

  isDisabled: boolean = true; // Status awal ( disable)

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    console.log("cek 123456") // Toggle status
  }


  // edi status product.....................................................

  refreshTable() {
    this.groupedProducts = JSON.parse(JSON.stringify(this.originalGroupedProducts));
  }

  changedProducts: any[] = [];
  public allProducts: Product[] = []


  // Mengambil semua data dari groupedProducts

  isFormDirty: boolean = false;
  // changestatusdisable: boolean = true;
  cekstatus(): void{
  this.allProducts = Object.values(this.groupedProducts).flat(); // Data saat ini
  if (this.allProducts.length !== this.originalProducts.length) {
    console.error('Jumlah produk tidak sesuai antara allProducts dan originalProducts');
    return;
  }
  this.changedProducts = this.allProducts.filter((product, index) => {
    
    return product.isActivated !== this.originalProducts[index].isActivated; // Bandingkan status
    
  });
  if(this.changedProducts.length > 0){
    console.log("data ada perubahan", this.changedProducts)
    // this.changestatusdisable= false
    this.isFormDirty = true;
  }
  else{
    console.log("data tidak ada perubahan")
    this.isFormDirty = false;
    // this.changestatusdisable= false
  }
  
}

// verifikasichanges(): void{
//   this.cekstatus()
//   if(this.changedProducts.length > 0){
//     console.log("data ada perubahan", this.changedProducts)
//     this.isFormDirty = true;
//   }
//   else{
//     console.log("data tidak ada perubahan")
//     this.isFormDirty = false;
//   }
// }


  cekperubahan(): void{
    this.cekstatus()
    if (this.changedProducts.length > 0) {
      const modalElement = document.getElementById('changeModal');
      // jika ada perubahan,  ubah unutk notif
      // this.isFormDirty = true;
      // Jika ada perubahan, buka modal
      const changeModal = new (window as any).bootstrap.Modal(modalElement);
      changeModal.show();
    } else {
      console.log("Tidak ada perubahan.");
    }
  }

  // mencegah kehalaman lain
  canDeactivate(): boolean {
    this.cekstatus()
    if (this.isFormDirty) {
      return confirm('Changes you made may not be saved. Are you sure you want to leave?');
    }
    return true;
  }

  //mencegah reload atau menutup halaman
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.cekstatus();
    if (this.isFormDirty) {
      $event.returnValue = 'Changes you made may not be saved';
    }
  }


  closeModal() {
    const modalElement = document.getElementById('changeModal');
    const changeModal = new (window as any).bootstrap.Modal(modalElement);
    changeModal.hide();
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

  
  
  

  buttonsaveproduct() :void{
    // this.productToSave = [...this.allProducts];
    this.productToSave = JSON.parse(JSON.stringify(this.allProducts));
    console.log(this.productToSave)

    this.loaderService.show(); 
    this.productservice.saveProducts(this.productToSave).subscribe(
      (response) => {
        if (response['isSuccess']==true) {
          console.log('All products saved successfully',response);
          this.closeModal();
          this.showsuccessToast()
          this.dataproductawal()
        } else {
          console.error('Failed to save products');
          this.refreshTable()
          this.closeModal();
          this.showErrorToast()
        }
        // this.dataproductawal()
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving products:', error);
        this.refreshTable()
        this.closeModal();
        this.showErrorToast()
        // this.dataproductawal()
        this.loaderService.hideWithDelay(2000);
      }
    );
  }



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
    
  }, {})
  this.dataproductawal()
  
  ;}

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

  // menu add save.......................
  // menu simpan gambar..................

  previewUrl: string | ArrayBuffer | null = null;
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result; // Simpan URL pratinjau ke variabel
      };

      reader.readAsDataURL(this.image); // Baca file sebagai Data URL
    }
  }


  saveProduct() {
    this.loaderService.show();
    console.log('save product');
    // console.log('this.productForm :>> ', this.productForm);

    if (this.productForm.valid) {
      const product: Product = {
        name: this.productForm.get('name')?.value,
        price: this.productForm.get('price')?.value,
        description: this.productForm.get('description')?.value,
        isActivated: this.productForm.get('isActivated')?.value,
        categoryId: this.productForm.get('category')?.value?.id,
      };

      console.log('Saving product:', product);
      // this.messageService.add({
      //   severity: 'success',
      //   summary: 'Product Saved',
      //   detail: 'The product has been saved successfully.',
      // });

      // this.loaderService.show();
      if (this.image) {
        this.productservice.addProduct(product, this.image).subscribe(
          (savedProduct) => {
            // window.location.reload();
            this.showsuccessToast()
            

          },
          (error) => {
            console.log('error :>> ', error);
            // this.messageService.add({
            //   severity: 'error',
            //   summary: 'Error Saving Product',
            //   detail: 'There was an error saving the product.',
            // });
            this.showErrorToast()
            this.loaderService.hideWithDelay(2000);
          }
        );
      } else {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Image Required',
        //   detail: 'Please upload an image before saving the product.',
        // });
        this.showErrorToast()
        this.loaderService.hideWithDelay(2000);
      }
    } else {
      // this.messageService.add({
      //   severity: 'error',
      //   summary: 'Form Invalid',
      //   detail: 'Please fill in all the required fields.',
      // });
      this.showErrorToast()
      this.loaderService.hideWithDelay(2000);
    }
  }


  // preview gambar di tabel

  selectedImage: string | null = null;

  openImageModal(imageUrl: string): void {
    console.log ("imageUrl",imageUrl)
    if (imageUrl) {
      this.selectedImage = imageUrl;
      const modal = new (window as any).bootstrap.Modal(
        document.getElementById('imageModal')
      );
      modal.show();
    } else {
      console.log('Image URL is invalid or empty:', imageUrl);
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
