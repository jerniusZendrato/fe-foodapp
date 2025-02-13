import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { OrderViewAdmin } from 'src/app/models/order-view-admin.model';
import { CategoryService } from 'src/app/service/category.service';
import { LoaderService } from 'src/app/service/loader.service';
import { OrderAdminService } from 'src/app/service/order-admin.service';

@Component({
  selector: 'app-transaksi-cassier-admin',
  templateUrl: './transaksi-cassier-admin.component.html',
  styleUrls: ['./transaksi-cassier-admin.component.css']
})
export class TransaksiCassierAdminComponent implements OnInit {
  ngOnInit(): void {
  this.getorderview()
  this.loadcategory()
    
  }
  constructor(
    private orderadmin: OrderAdminService,
    private loaderService: LoaderService,
    private categoryservice: CategoryService

  ){}

  public orderview: OrderViewAdmin[] = []
  public orderprocess: OrderViewAdmin[] = []
  public orderdeliverd: OrderViewAdmin[] = []


  getorderview(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.orderadmin.getorder().subscribe(
        (Response: OrderViewAdmin[]) => {
          if (Response) {
            const tanggalSekarang: string = new Date().toISOString().split('T')[0];
             // Filter hanya order yang dibuat hari ini
             
            this.orderview = Response.filter(order => {
              if (order.createdAt) {
                const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
                return createdAtDate === tanggalSekarang;
              }
              return false;
            });

            // memasukkan status prosess ke orderprocess
            this.orderprocess = Response.filter(order =>{
              if (order.createdAt && order.status) {
                const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
                return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'process';
              }
              return false;
            });

            // memasukkan status deliverd ke orderdeliverd
            this.orderdeliverd = Response.filter(order => {
              if (order.createdAt && order.status) {
                const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
                return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'deliverd';
              }
              return false;
            });
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

  addneworder = false;
  moveaddorder() {
    this.addneworder = !this.addneworder; // Toggle status
    
  }

  public datacategory: Category[] = []

  loadcategory(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.categoryservice.getcategory().subscribe(
        (Response: Category[]) => {
          if (Response) {
            this.datacategory = Response
            console.log("ini category", this.datacategory)
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



}
