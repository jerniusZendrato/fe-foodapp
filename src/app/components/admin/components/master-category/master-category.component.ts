import {  Component, HostListener, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LoaderService } from '../../services/loader.service';
import { AdminCategory, patchCategory, putCategory } from '../../models/admin-category.model';

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
    private loaderService: LoaderService
    
  ){}

  public category: AdminCategory[] = []

    // variabel detail category
  detailcategory: AdminCategory | null = null;

  loadcategory(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.categoryservice.getcategory().subscribe(
        (Response: AdminCategory[]) => {
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

  onDetailCategory(category:AdminCategory) :void{
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

  public allCategory: AdminCategory[] = []
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
      const changeModal = new (window as any).bootstrap.Modal(modalElement);
      changeModal.show();
    } else {
      console.log("Tidak ada perubahan.");
    }
  }

    // mencegah kehalaman lain sebelum di save
    canDeactivate(): boolean {
      this.cekstatus()
      if (this.isFormDirty) {
        return confirm('Changes you made may not be saved. Are you sure you want to leave?');
      }
      return true;
    }
  
    //mencegah reload atau menutup halaman sebelum di save
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any): void {
      this.cekstatus();
      if (this.isFormDirty) {
        $event.returnValue = 'Changes you made may not be saved';
      }
    }

// --------------menu delete-------------------
  
  selectedCategoryIdDelete: string | null = null; // Menyimpan ID kategori yang akan dihapus
  deletecategory(id : string) : void{
    this.selectedCategoryIdDelete = id
    const modalElement = document.getElementById('konfimasi_hapus_category');
    const changeModal = new (window as any).bootstrap.Modal(modalElement);
    changeModal.show();

  }
  confimdeletecategory(): void{
    this.loaderService.show(); 
    if(this.selectedCategoryIdDelete){
      this.categoryservice.deleteCategory(this.selectedCategoryIdDelete).subscribe(
        (response)=>{
          if (response['isSuccess']==true) { 
            this.refreshTable()
            this.showsuccessToast()
          }
          else {
            console.error('Failed to save products');
            this.refreshTable()
            this.showErrorToast()
          }
          this.loaderService.hideWithDelay(2000);
        },
        (error) => {
          console.error('Error delete category:', error);
          this.refreshTable()
          this.closeModal();
          this.showErrorToast()
          this.loaderService.hideWithDelay(2000);
        }
        
      )

    }
  }

//----------------------menu add------------------
  // modaladdcategory():void{
  //   const modalElement = document.getElementById('add_kategory_baru');
  //   const changeModal = new (window as any).bootstrap.Modal(modalElement);
  //   changeModal.show();
  // }
  // newCategoryName: string = ''; // Variabel untuk menyimpan input


  newCategoryName:string = ''

  addcategory():void{
    this.loaderService.show(); 
    const categoryToSave = { name: this.newCategoryName };
    console.log('categoryToSave',categoryToSave)
    this.categoryservice.saveCategory(categoryToSave).subscribe(
      (responce) =>{
        if(responce['isSuccess']==true){
          this.showsuccessToast()
          this.refreshTable()
        }else{
          console.error('Failed to save category');
          this.refreshTable()
          this.showErrorToast()
        }
        this.newCategoryName = ''; // Kosongkan input setelah disimpan
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving category:', error);
        this.refreshTable()
        this.showErrorToast()
        this.newCategoryName = ''; // Kosongkan input setelah disimpan
        this.loaderService.hideWithDelay(2000);
      }
    )
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

  
  private categoryToSavestatus: patchCategory = { category: [] }
  buttonsavestatuscategory(): void {
    this.categoryToSavestatus = {
        category: this.changedProducts.map(({ id, isActivated }) => ({
            id,
            isActivated
        }))
    };
  
    this.loaderService.show(); 
    this.categoryservice.savestatusCategory(this.categoryToSavestatus).subscribe(
      (response) => {
        if (response['isSuccess']==true) {
          console.log('All products saved successfully',response);
          this.closeModal();
          this.showsuccessToast()
          // supaya menyimpan data awal yang sudah di update
          this.dataproductawal()
        } else {
          console.error('Failed to save products');
          this.refreshTable()
          this.closeModal();
          this.showErrorToast()
        }
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving products:', error);
        this.refreshTable()
        this.closeModal();
        this.showErrorToast()
        this.loaderService.hideWithDelay(2000);
      }
    );
  }

  // fungsi select category
  selectedCategory: string | null = null;
  selectedidCategory: string | null = null;
  statuschagecategory: string | null = null;

  selectCategory(categoryName: string, id:string): void {
    this.selectedCategory = categoryName;
    this.selectedidCategory = id;
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

  updatecategoryidSave : string|null = null
  updatecategorynameSave : string =''
  

  update_category ():void{
    this.loaderService.show(); 
    this.updatecategoryidSave =  this.selectedidCategory
    if(this.updatecategoryidSave && this.updatecategorynameSave){
      this.categoryservice.putCategory(this.updatecategoryidSave, this.updatecategorynameSave ).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.refreshTable()
          this.showsuccessToast()
          this.loaderService.hideWithDelay(2000);
          this.updatecategorynameSave = ''
          // Tambahkan logika jika perlu
        },
        error: (error) => {
          this.refreshTable()
          this.showErrorToast()
          console.error('Update failed:', error);
          this.loaderService.hideWithDelay(2000);
          // Tambahkan pesan error jika diperlukan
        }}
    );
  }
    
  }
  searchText: string = '';



}
