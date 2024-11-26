import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(
    private productservice : ProductService,
    private categoryservice : CategoryService
  ){}

  public product: Product[]=[]
  public category: Category[]=[]
  public datacategory: string = 'teh';

  ngOnInit(): void {
    // digunakan unutk memnaggil fungsi yang sudah dibuat
    this.loadproduct(this.datacategory)
    this.loadcategory()


  }

  onButtonClick(event: Event): void {
    const buttonId = (event.target as HTMLButtonElement).id;
    console.log("ini buttonId", buttonId)
    this.datacategory = buttonId;
    this.loadproduct(this.datacategory)
  }


  loadcategory():void{
    this.categoryservice.getcategory().subscribe(
      (Response:Category[])=>{
        if(Response){
          this.category = Response
        }
        else
        console.log("data tidak isSuccess=true")
      }
    )
  }

  loadproduct(buttonId: string): void{
    this.productservice.getproduct().subscribe(
      (Response:Product[])=>{
        if(Response){
          console.log("cek asdfsdf")
          this.product = Response.filter(product => product.category === buttonId)
          console.log(Response,"this producttt",buttonId)
        }
        else
        console.log("data tidak isSuccess=true")
      }
    )
  }


}
