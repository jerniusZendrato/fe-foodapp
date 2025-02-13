import { Component, HostListener, OnInit } from '@angular/core';
import { Category, patchCategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-master-category',
  templateUrl: './master-category.component.html',
  styleUrls: ['./master-category.component.css']
})
export class MasterCategoryComponent implements OnInit {

  async ngOnInit() {
    await this.loadcategory(); 
    console.log("ini hasil dari category",this.category)
    this.dataproductawal()
  }


  constructor(
    private categoryservice: CategoryService,
    private loaderService: LoaderService,
    
  ){}

  public category: Category[] = []

    // variabel detail category
  detailcategory: Category | null = null;

  loadcategory(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.categoryservice.getcategory().subscribe(
        (Response: Category[]) => {
          if (Response) {
            this.category = Response
            console.log("ini category", this.category)
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

  onDetailCategory(category:Category) :void{
    this.detailcategory = category;
    console.log(this.detailcategory)
  }

  refreshTable() {

    this.category = JSON.parse(JSON.stringify(this.originalCategory));


  }

  // Properti untuk menyimpan data awal
  originalCategory: any[] = [];
  dataproductawal(){
    this.originalCategory = JSON.parse(JSON.stringify(this.category));
    
  }

  public allCategory: Category[] = []
  changedProducts: any[] = [];
  isFormDirty: boolean = false;
  cekstatus(): void{
    this.allCategory = JSON.parse(JSON.stringify(this.category));
    if (this.allCategory.length !== this.originalCategory.length) {
      console.error('Jumlah produk tidak sesuai antara allcategory dan originalcategory');
      return;
    }
    this.changedProducts = this.allCategory.filter((category, index) => {
      return category.isActivated !== this.originalCategory[index].isActivated; // Bandingkan status
  
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

  private categoryToSavestatus: patchCategory[] = []
  buttonsavestatuscategory() :void{
    //ambil data id dan isActivated dari data yang berubah
    this.categoryToSavestatus = this.categoryToSavestatus = this.changedProducts.map(({ id, isActivated }) => ({
      id,
      isActivated
    }));
    
    this.loaderService.show(); 
    this.categoryservice.savestatusCategory(this.categoryToSavestatus).subscribe(
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
        // supaya menyimpan data awal yang sudah di update
        // this.dataproductawal()
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving products:', error);
        this.refreshTable()
        this.closeModal();
        this.showErrorToast()
        // supaya menyimpan data awal yang sudah di update
        // this.dataproductawal()

        this.loaderService.hideWithDelay(2000);
      }
    );
  }

  // fungsi select category

  selectedCategory: string | null = null;
  statuschagecategory: string | null = null;

  selectCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.statuschagecategory = '1';
    console.log('Selected Category:', this.selectedCategory);
  }
  clearselectedCategory(): void{
    this.statuschagecategory = null;
  }

  // funggsi change category
  selectchangeCategory(): void{
    this.statuschagecategory = '2';
  }



  // isSecondCheckboxDisabled = true;
  // editstatusproduct(event:Event):void{
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   this.isSecondCheckboxDisabled = !isChecked;
  //   if (!isChecked) {
  //     this.cekstatus();  // Menjalankan fungsi cekstatus jika checkbox unchecked
  //     console.log("cek kalau sudah uncheck")
  //   }
  // }

}
