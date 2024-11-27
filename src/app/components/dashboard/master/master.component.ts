import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { EditProduct } from 'src/app/models/edit-product.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
// import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  modalService: any;

  constructor(
    private productservice: ProductService,
    private categoryservice: CategoryService,
    
  ) { }

  public product: Product[] = []
  public category: Category[] = []
  public editproduct: EditProduct[] = []

  //variabel unutk menjadi parameter 
  //memunculkan product berdasarkan kategory
  public onecategory: string = ''
  public datacategory: string = this.onecategory;

  // variabel edit
  productToEdit: EditProduct | null = null;
  


  

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

  onEditProduct(product:EditProduct) :void{
    this.productToEdit = product;
    console.log(this.productToEdit)
  }



  loadcategory(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoryservice.getcategory().subscribe(
        (Response: Category[]) => {
          if (Response) {
            this.category = Response
            this.onecategory = this.category[0]['name']
            resolve();
          }
          else
            console.log("data tidak isSuccess=true")
          reject()
        }
      )
    });
  }

  loadproduct(buttonId: string): void {
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


}
