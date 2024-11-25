import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(
    private productservice : ProductService
  ){}

  public product: Product[]=[]

  ngOnInit(): void {
    // digunakan unutk memnaggil fungsi yang sudah dibuat
    this.loadproduct()


  }

  loadproduct(): void{
    this.productservice.getproduct().subscribe(
      (Response:any)=>{
        if(Response.isSuccess){
          console.log("cek asdfsdf")
          this.product = Response.data
          console.log("this product")
        }
      }
    )
  }


}
