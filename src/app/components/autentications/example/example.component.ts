import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';



@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  constructor(
    private productservice:ProductService,
    private categoryservice:CategoryService 
  ){}


  public products: any[] =[];
  public categorys: any[] =[];

  ngOnInit():void{
    console.log("cekdfasf")
    this.loadproduct()
    this.loadcategory()
  }
   // public products: any[]=[
  //   {name :'kopi', url_image : 'url', price: '10000', category: 'minuman', description: 'ini adalah kopi', status:false},
  //   {name :'kopi', url_image : 'url', price: '10000', category: 'minuman', description: 'ini adalah kopi', status:true},
  //   {name :'kopi', url_image : 'url', price: '10000', category: 'minuman', description: 'ini adalah kopi', status:true},
  //   {name :'kopi', url_image : 'url', price: '10000', category: 'minuman', description: 'ini adalah kopi', status:true}
  // ]
  loadproduct(): void{
    this.productservice.getproduct().subscribe(
     (response:any)=>{
      // this.products = response
      console.log(response.isSuccess)
      if (response.isSuccess){
        this.products = response.data

      }
     } 
    )
  }

  loadcategory():void{
    this.categoryservice.getcategory().subscribe(
      (response:any)=>{
        // this.products = response
        console.log(response.data)
        if (response.isSuccess){
          this.categorys = response.data
  
        }
       } 
    )
  
  }
}
