import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from '../../services/order-admin.service';
import { LoaderService } from '../../services/loader.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';
// import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  ngOnInit(): void {
    this.getorderview()
  }

  constructor(
      private orderadmin: OrderAdminService,
      private loaderService: LoaderService
  
    ){}
  isDisabled: boolean = true; // Status awal ( disable)

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
    console.log("cek 123456") // Toggle status
  }

  selectedValue = 'ALL'; // Nilai default
  public Historyorder: AdminOrderCassier[] = []
  
  public currentDate = new Date().toISOString().split('T')[0]; 
  getorderview(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loaderService.show(); // Tampilkan loader
  
      this.orderadmin.getorders().subscribe(
        (response: AdminOrderCassier[]) => {
          this.Historyorder = response; // Simpan data
          this.loaderService.hide(); // Sembunyikan loader
          resolve(); // Beri tahu bahwa proses selesai
        },
        (error) => {
          console.error('Error fetching orders:', error);
          this.loaderService.hide(); // Pastikan loader tetap disembunyikan meskipun error
          reject(error); // Tolak promise jika terjadi error
        }
      );
    });
  }
  

  startDatetoexcel: Date = new Date();;  // format: 'YYYY-MM-DD'
  endDatetoeexcel: Date = new Date();;

  exportFilteredToExcel(){
    this.orderadmin.getorders().subscribe(
      (response: AdminOrderCassier[]) => {
        // if(this.startDatetoexcel && this.endDatetoeexcel){
          const datatoexcel = response.filter(order =>{
          const createdDate = new Date(order.createdAt)
          const start = new Date(this.startDatetoexcel);
          const end = new Date(this.endDatetoeexcel);
          return createdDate >= start && createdDate <= end;
      })
          const detailOrder = datatoexcel.flatMap(order => order.productOrders);

          const simplifiedData = datatoexcel.filter(orderfix =>({
            code : orderfix.code,
            customerName: orderfix.customerName,
            type: orderfix.type,
            tableName: orderfix.tableName,
            adminName: orderfix.adminName,
            createdAt: orderfix.createdAt,
            paymentStatus: orderfix.paymentStatus,
            paymentPaidAt: orderfix.paymentPaidAt,
            status: orderfix.status,
            deliveredAt: orderfix.deliveredAt,
            totalPrice: orderfix.totalPrice
          }))
          console.log("simplifiedData",datatoexcel)
          // const worksheet = XLSX.utils.json_to_sheet(simplifiedData);
          // const workbook = { Sheets: { 'Orders': worksheet }, SheetNames: ['Orders'] };
          // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          // const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
          // FileSaver.saveAs(blob, `Orders_${this.startDatetoexcel}_to_${this.endDatetoeexcel}.xlsx`);
      // }
      // else{
      //   confirm("tolong lengkapi data")
      // }
    }
    )
  }

    // menu search text
    searchText: string = '';

}
