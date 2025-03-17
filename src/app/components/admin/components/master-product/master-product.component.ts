import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/guards/unsaved-changes-verifikasi.service';
import { AdminCategory, AdminCategoryselect } from '../../models/admin-category.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { LoaderService } from '../../services/loader.service';
import { AdminProduct, updateAdminProduct } from '../../models/admin-product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-master-product',
  templateUrl: './master-product.component.html',
  styleUrls: ['./master-product.component.css']
})
export class MasterProductComponent implements OnInit, CanComponentDeactivate{
  
  modalService: any;
  // isSecondCheckboxDisabled = true;



  productForm: FormGroup;
  producteditForm: FormGroup;
  visible: boolean = false;
  productName: string | undefined;
  selectedCategory: any;
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
    this.producteditForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      categoryId: [null, Validators.required],
      isActivated: [],
    });
    
  }

  public product: AdminProduct[] = []
  public products: AdminProduct[] = []
  public category: AdminCategory[] = []

  public groupedProducts: { [key: string]: AdminProduct[] } = {};


  public onecategory: string = ''
  public datacategory: string = this.onecategory;
  private categoriesSubject = new BehaviorSubject<any[]>([]); // Observable categories
  categories$ = this.categoriesSubject.asObservable(); 

  // variabel edit
  productToEdit: updateAdminProduct| null = null;

    // variabel save
  productToSave: AdminProduct[]  = [];

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

  public originalGroupedProducts: { [key: string]: AdminProduct[] } = {};
  dataproductawal(){
    this.originalProducts = Object.values(this.groupedProducts).flat().map(product => ({
      ...product, // Salin semua properti
      isActivated: product.isActivated // Simpan status awal
  
      }));
      // this.originalGroupedProducts = { ...this.groupedProducts };
      this.originalGroupedProducts = JSON.parse(JSON.stringify(this.groupedProducts));
      console.log("ini data originalGroupedProducts",this.originalGroupedProducts)
  }
  


  onEditProduct(product:updateAdminProduct) :void{
    this.productToEdit = product;
    if (this.productToEdit) {
      this.producteditForm.patchValue({
        id: this.productToEdit.id,
        name: this.productToEdit.name,
        price: this.productToEdit.price,
        categoryId: this.productToEdit.categoryId,
        description: this.productToEdit.description,
        isActivated :this.productToEdit.isActivated
      });
    }
    
    console.log("Updated Form Value:", this.producteditForm.value);
  }

  isDisabled: boolean = true; // Status awal ( disable)

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    console.log("cek 123456") // Toggle status
  }



  // menu search text
  searchText: string = '';


  // edi status product.....................................................

  refreshTable() {
    this.groupedProducts = JSON.parse(JSON.stringify(this.originalGroupedProducts));
  }

  changedProducts: any[] = [];
  public allProducts: AdminProduct[] = []


  // Mengambil semua data dari groupedProducts

  isFormDirty: boolean = false;
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
    
    this.isFormDirty = true;
  }
  else{
    console.log("data tidak ada perubahan")
    this.isFormDirty = false;
  }
  
}



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

  
  
  
// button jika ada perubahan status
  buttonsaveproduct() :void{
    // this.productToSave = [...this.allProducts];
    this.productToSave = JSON.parse(JSON.stringify(this.changedProducts));
    // this.productToSave = JSON.parse(JSON.stringify(this.allProducts));
    console.log("productToSaveproductToSave", this.productToSave)

    this.loaderService.show(); 
    this.productservice.savestatusProducts(this.productToSave).subscribe(
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
        console.log("masuk ke sini jka gagal atau berhasil save")
        this.loaderService.hideWithDelay(200);
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
        (Response: AdminCategory[]) => {
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
      (Response: AdminProduct[]) => {
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
      (Response: AdminProduct[]) => {
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


// update data product--------------------------------------------------
  updateproduct(id:string){
    this.loaderService.show();
    if (this.producteditForm.valid) {
      let isActivated = this.producteditForm.get('isActivated')?.value;
      if (!isActivated) {
        isActivated = this.productToEdit?.isActivated;
      }

      const updateproduct: updateAdminProduct = {
        id: this.producteditForm.get('id')?.value,
        name: this.producteditForm.get('name')?.value,
        price: this.producteditForm.get('price')?.value,
        description: this.producteditForm.get('description')?.value,
        categoryId: this.producteditForm.get('categoryId')?.value,
        isActivated: isActivated,

      }
      console.log("updateproduct",updateproduct)
      // if (this.image ){
      this.productservice.updateroduct(updateproduct, this.image, id).subscribe(
        (isSuccess) => {
          this.showsuccessToast()
          this.image = null
          this.loaderService.hideWithDelay(2000);
          this.loadproducts()
          this.groupProductsByCategory()  
        },
        (error) => {
          console.log('error :>> ', error);
          this.showErrorToast()
          this.image = null
          this.loaderService.hideWithDelay(2000);
        }
        );
        // this.loaderService.hideWithDelay(2000);
        // this.image = null
      // } else {
      //   this.showErrorToast()
      //   console.log("no image")
      //   this.loaderService.hideWithDelay(2000);
      //   this.image = null
      // }
    }else {
      this.showErrorToast()
      console.log("producteditForm invalid")
      this.loaderService.hideWithDelay(2000);
    }
    
  }



// add product----------------------------------------------
  saveProduct() {
    this.loaderService.show();
    console.log('save product');

    if (this.productForm.valid) {
      const product: AdminProduct = {
        name: this.productForm.get('name')?.value,
        price: this.productForm.get('price')?.value,
        description: this.productForm.get('description')?.value,
        isActivated: this.productForm.get('isActivated')?.value,
        categoryId: this.productForm.get('category')?.value?.id,
      };
      if (this.image) {
        this.productservice.addProduct(product, this.image).subscribe(
          (savedProduct) => {
            // window.location.reload();
            this.showsuccessToast()
          },
          (error) => {
            console.log('error :>> ', error);
            this.showErrorToast()
          }
        );
        this.loaderService.hideWithDelay(2000);
        this.image = null
      } else {
        this.showErrorToast()
        this.loaderService.hideWithDelay(2000);
        this.image = null
      }
    } else {
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

  // hapus product___________________________________________________

  notifdeleteprodcut(name:string): boolean{
    return confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`);
  }
  deleteproduct(idproduct: string, namaproduct:string){
    // this.notifdeleteprodcut(namaproduct)
    if (this.notifdeleteprodcut(namaproduct)){
      this.loaderService.show();
      this.productservice.deleteProduct(idproduct).subscribe({
        next: () => {
          this.showsuccessToast()
          console.log(`${idproduct} has been deleted.`);
          this.loaderService.hideWithDelay(500);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          // Tambahkan kode untuk refresh data atau update UI
        },
        
        error: (err) => {
          console.error('Error deleting product:', err);
          this.showErrorToast()
          this.loaderService.hideWithDelay(500);
        }
        
      });  
    }
    

  }


}
