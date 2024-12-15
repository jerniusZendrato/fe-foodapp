import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
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
  }


  constructor(
    private categoryservice: CategoryService,
    private loaderService: LoaderService
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

}
