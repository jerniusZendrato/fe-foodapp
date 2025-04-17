import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { OrderAdminService } from '../../services/order-admin.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';
import { AdminCategory } from '../../models/admin-category.model';
import { AdminProduct } from '../../models/admin-product.model';
import { WebsocketService } from 'src/app/fe-customer/shared/services/websocket.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-transaction-cassier-admin',
  templateUrl: './transaction-cassier-admin.component.html',
  styleUrls: ['./transaction-cassier-admin.component.css']
})
export class TransactionCassierAdminComponent implements OnInit {
  constructor(
    private orderadmin: OrderAdminService,
    private loaderService: LoaderService,
    private webSocketService: WebsocketService

  ){}
  ngOnInit(): void {
  this.getorderview()
  this.groupProductsByCategory()
  this.webSocketService.subscribeToOrder();
  this.updateorderviewwebsocket()
  }

  public orderview: AdminOrderCassier[] = []
  public orderprocess: AdminOrderCassier[] = []
  public orderdeliverd: AdminOrderCassier[] = []

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
  }
  public currentDate = new Date().toISOString().split('T')[0]; 

  updateorderviewwebsocket(): void{
    this.webSocketService.orderStatus$.subscribe(
      (data) => {
        // confirm("masuk nih")
        try {
          const parsedData = JSON.parse(data ?? "[]") as {data:AdminOrderCassier[]}; // 🔥 Konversi JSON string ke array
          if (!parsedData || typeof parsedData !== "object" || !Array.isArray(parsedData.data)) {
            console.error("Expected an array, but received:", parsedData);
            return;
          }
        const tanggalSekarang: string = new Date().toISOString().split('T')[0];
        
        this.orderview = parsedData.data.filter(order => {
          console.log('order.createdAt',order.createdAt)
          if (order.createdAt ) {
            
            const createdAtDate = new Date(order.createdAt).toLocaleDateString('en-CA').split('T')[0];
            // console.log("Order ditemukan:", order);
            console.log("createdAtDate",createdAtDate,order.customerName)
            this.neworderToast()
            return createdAtDate === tanggalSekarang;
          }
          return false;
        });

        // data orderan status process
        this.orderprocess = parsedData.data.filter(order =>{
          if (order.createdAt && order.status) {
            const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
            return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'process';
          }
          return false;
        });
        console.log("this.orderprocess", this.orderprocess)

        // data orderan status delivered
        this.orderdeliverd = parsedData.data.filter(order => {
          if (order.createdAt && order.status) {
            const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
            // console.log('createdAtDateEEEE',order.status.toLowerCase())
            return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'delivered';
          }
          return false;
        });

        
      }catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
      }
    );
  }
  getorderview(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.orderadmin.getorder(this.currentDate).subscribe(
        (Response: AdminOrderCassier[]) => {
          if (Response) {
            const tanggalSekarang: string = new Date().toISOString().split('T')[0];
            // console.log("orderview",orderview)

             // Filter hanya order yang dibuat hari ini
             
            this.orderview = Response.filter(order => {
              console.log('order.createdAt',order.createdAt)
              if (order.createdAt ) {
                
                const createdAtDate = new Date(order.createdAt).toLocaleDateString('en-CA').split('T')[0];
                // console.log("Order ditemukan:", order);
                console.log("createdAtDate",createdAtDate,order.customerName)
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
                // console.log('createdAtDateEEEE',order.status.toLowerCase())
                return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'delivered';
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

  public datacategory: AdminCategory[] = []
  

 



  // menu Add new Order

 

  // categories: any[] = [];
  public products: AdminProduct[] = []
  public groupedProducts: { [key: string]: AdminProduct[] } = {};

  groupProductsByCategory(): void {

    const activeCategories = this.datacategory
    .filter(category => category.isActivated)
    .map(category => category.name);

    // cek apakah di roduct memiliki kategory aktif 
    // jika ia maka masukkan data tersebut ke filteredProducts
    const filteredProducts = activeCategories.length > 0
    ? this.products.filter(product => product.category && activeCategories.includes(product.category))
    : [];

    console.log("filteredProducts",filteredProducts)
    this.groupedProducts = filteredProducts.reduce((grouped: any, product: any) => {
      (grouped[product.category] = grouped[product.category] || []).push(product);
      return grouped;
      
    }, {})
    console.log (" this.groupedProducts", this.groupedProducts)
    
    ;}

    //FUNGSI UNTUK DETAIL ORDERAN
  ordersbyid: AdminOrderCassier[] = [];
  getorderbyid(id: string): void{
    if(id){
      this.loaderService.show();
      this.orderadmin.getorderbyid(id).subscribe(
        (Response: AdminOrderCassier[]) => {
          if(Response){
            console.log(Response)
            this.ordersbyid = Response
            
            this.loaderService.hideWithDelay(1000);
          }else{
            this.loaderService.hideWithDelay(1000);

          }
        }
      )
    }
  }


  
  
  // public datacordercassier: AdminOrderCassier[] = []
  // public currentDate = new Date().toISOString().split('T')[0]; 

  // loaderAdminOrderCassier(): Promise<void>{
  //   return new Promise((resolve, reject) => {
  //     this.loaderService.show();
  //     this.orderadmin.getorder(this.currentDate).subscribe(
  //       (Response: AdminOrderCassier[]) => {
  //         if (Response) {
  //           this.datacordercassier = Response
  //           console.log("ini category", this.datacategory)
  //           // this.groupProductsByCategory()
  //           this.loaderService.hideWithDelay(1000);
  //           resolve();
  //         }
  //         else
  //           console.log("data tidak isSuccess=true")
  //           this.loaderService.hideWithDelay(1000);
  //         reject()
  //       }
  //     )
      
  //   })

  // }


  downloadpdf(id:string,paymentStatus: string){
   const idorder = id
   const paymentstatus = paymentStatus
   console.log("paymentstatus",paymentstatus)
    const element = document.getElementById('bill') as HTMLElement;

    if (element) {
      // Simpan style sebelumnya
      const prevMaxHeight = element.style.maxHeight;
      const prevOverflow = element.style.overflow;

      // Ubah style supaya seluruh isi modal terlihat
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      this.loaderService.show();

      setTimeout(() => {
        html2canvas(element, {
          useCORS: true,             // Mendukung CORS untuk gambar eksternal
          scale: 2,                  // Menambah resolusi gambar
          logging: true,             // Debugging opsional
          backgroundColor: '#fff'    // Latar putih agar tidak transparan
        }).then((canvas) => {
          // Konversi hasil screenshot jadi data URL PNG
          const imgData = canvas.toDataURL('image/png');

          // Buat link untuk unduh file
          const link = document.createElement('a');
          link.href = imgData;
          link.download = 'screenshot.png';
          link.click();

          // Kembalikan style ke semula
          element.style.maxHeight = prevMaxHeight;
          element.style.overflow = prevOverflow;
        }).catch(error => {
          console.error("Error generating image:", error);
        });
      }, 500); // Tunggu render benar-benar selesai
      if(paymentstatus !='PAID'){
        this.updatepaymentstatus(idorder)
      }
      this.loaderService.hideWithDelay(1000);
    }
  }

  updatepaymentstatus(orderid:string){
    this.orderadmin.patchpaymentstatus(orderid).subscribe(
      (response) => {
        if (response['isSuccess']==true){
          console.log('saved successfully',response);
          this.getorderview()
          this.groupProductsByCategory()
          this.showsuccessToast()
        }
        else {
          console.error('Failed to save');
          this.showErrorToast()
        }
        console.log("masuk ke sini jka gagal atau berhasil save")
        
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        this.loaderService.hideWithDelay(2000);
        console.error('Error saving:', error);
        this.showErrorToast()
      }
    )
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


}

