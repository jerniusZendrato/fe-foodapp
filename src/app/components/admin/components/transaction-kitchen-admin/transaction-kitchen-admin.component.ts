import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { KitchenAdminService } from '../../services/kitchen-admin.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';
import { WebsocketService } from 'src/app/fe-customer/shared/services/websocket.service';

@Component({
  selector: 'app-transaction-kitchen-admin',
  templateUrl: './transaction-kitchen-admin.component.html',
  styleUrls: ['./transaction-kitchen-admin.component.css']
})
export class TransactionKitchenAdminComponent implements OnInit {


  ngOnInit(): void {
      this.getkitchenorder()
      this.webSocketService.subscribeToOrder();
      this.updatekitchenorder()
    }
  constructor(
    private loaderService: LoaderService,
    private ktichenadmin: KitchenAdminService,
    private webSocketService: WebsocketService
  ){}

  public currentDate = new Date().toISOString().split('T')[0]; 

  // ini untuk tanggal kemarin
  // public currentDate_1 = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

  public status = 'PROCESS'
  public orderprocess: AdminOrderCassier[] = []
  public totalorderprocess: number = 0

  updatekitchenorder(): void{
    this.webSocketService.orderStatus$.subscribe(
      (data) => {
        try {
          const parsedData = JSON.parse(data ?? "[]") as {data:AdminOrderCassier[]}; // 🔥 Konversi JSON string ke array
          if (!parsedData || typeof parsedData !== "object" || !Array.isArray(parsedData.data)) {
            console.error("Expected an array, but received:", parsedData);
            return;
          }
          // if (this.getkitchenorderrespone != parsedData.data){
          this.orderprocess = parsedData.data.filter(order => {
            if (order.status) {
              this.playNotificationSound()
              return order.status.toLowerCase() === 'process'
            }
            return false;
          })
        // }
          this.totalorderprocess = this.orderprocess.length
          this.neworderToast()
        }catch (error) {
          console.error("Error parsing WebSocket data:", error);
        }

      })
  }

  playNotificationSound() {
    const audio = new Audio('assets/notification.mp3'); // Path ke file suara di dalam folder `assets`
    audio.play().catch(error => console.error("Audio playback failed:", error));
  }
  
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
  neworderToast(): void {
    const toastElement = document.getElementById('neworderToast');
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
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        this.loaderService.hideWithDelay(2000);
        console.error('Error saving:', error);
        this.showErrorToast()
      }
    )
  }

  

}



