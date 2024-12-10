import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
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
    private loaderService: LoaderService
    
  ) { }

  public product: Product[] = []
  public category: Category[] = []

  //variabel unutk menjadi parameter 
  //memunculkan product berdasarkan kategory
  public onecategory: string = ''
  public datacategory: string = this.onecategory;

  // variabel edit
  productToEdit: Product | null = null;

    // variabel save
  productToSave: Product[]  = [];

  isLoading: boolean = false;
  


  

  async ngOnInit() {
    await this.loadcategory(); // Tunggu hingga loadCategory selesai
    console.log(this.onecategory)
    this.loadproduct(this.onecategory); // Panggil loadProduct setelahnya
  }




  onButtonClick(event: Event): void {
    const buttonId = (event.target as HTMLButtonElement).id;
    this.datacategory = buttonId;
    this.loadproduct(this.datacategory)
  }
  editstatusproduct(event:Event):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isSecondCheckboxDisabled = !isChecked;
  }

  onEditProduct(product:Product) :void{
    this.productToEdit = product;
    console.log(this.productToEdit)
  }

  buttonsaveproduct() :void{
    this.productToSave = [...this.product];
    console.log(this.productToSave)

    this.loaderService.show(); 
    this.productservice.saveProducts(this.productToSave).subscribe(
      (response) => {
        if (response['isSuccess']==true) {
          console.log('All products saved successfully',response);
        } else {
          console.error('Failed to save products');
        }
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving products:', error);
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
            this.onecategory = this.category[0]['name']
            // console.log("ini this.category",this.category)
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

  loadproduct(buttonId: string): void {
    // this.loaderService.show();
    this.productservice.getproduct().subscribe(
      (Response: Product[]) => {
        if (Response) {
          this.product = Response.filter(product => product.category === buttonId)
          // this.loaderService.hideWithDelay(100);
          console.log(Response, "this producttt", buttonId)
        }
        else
        // this.loaderService.hideWithDelay(100);
          console.log("data tidak isSuccess=true")
      }
    )
  }


}
