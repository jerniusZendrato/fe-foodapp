import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { KitchenAdminService } from '../../services/kitchen-admin.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';

@Component({
  selector: 'app-transaction-kitchen-admin',
  templateUrl: './transaction-kitchen-admin.component.html',
  styleUrls: ['./transaction-kitchen-admin.component.css']
})
export class TransactionKitchenAdminComponent implements OnInit {


  ngOnInit(): void {
      this.getkitchenorder()
    }
  constructor(
    private loaderService: LoaderService,
    private ktichenadmin: KitchenAdminService,
  ){}

  public currentDate = new Date().toISOString().split('T')[0]; 
  public status = 'PROCESS'
  public orderprocess: AdminOrderCassier[] = []
  public totalorderprocess: number = 0

  getkitchenorder(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      
      this.ktichenadmin.getkitchenorder(this.currentDate,this.status).subscribe(
        (Response: AdminOrderCassier[]) => {
          if(Response){
            this.orderprocess = Response.filter(order =>{
              if (order.status) {
                return order.status.toLowerCase() === 'process'
              }
              return false;
            });
            this.totalorderprocess = this.orderprocess.length
            this.loaderService.hideWithDelay(1000);
          }
        }
      )
    })
  }

  showsuccessToast(): void {
    const toastElement = document.getElementById('successToast');
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }
  showErrorToast(): void {
    const toastElement = document.getElementById('errorToast');
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }
  patchorderstatus(orderid:string){
    this.loaderService.show();
    this.ktichenadmin.patchorderstatus(orderid).subscribe(
      (response) => {
        if (response['isSuccess']==true){
          console.log('saved successfully',response);
          this.showsuccessToast()
        }
        else {
          console.error('Failed to save');
          this.showErrorToast()
        }
        console.log("masuk ke sini jka gagal atau berhasil save")
        this.getkitchenorder()
        this.loaderService.hideWithDelay(200);
      },
      (error) => {
        this.loaderService.hideWithDelay(2000);
        console.error('Error saving:', error);
        this.showErrorToast()
      }
    )
  }

}
