import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from '../../services/order-admin.service';
import { LoaderService } from '../../services/loader.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HistoryOrderAdmin } from '../../models/history-order-admin.model';



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
  public Historyorder: HistoryOrderAdmin[] = []
  
  public currentDate = new Date().toISOString().split('T')[0]; 
  getorderview(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loaderService.show(); // Tampilkan loader
  
      this.orderadmin.getorders().subscribe(
        (response: HistoryOrderAdmin[]) => {
          this.Historyorder = response; // Simpan data
          this.getDetailOrder(this.Historyorder)
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

  getDetailOrder(order: any): string {
    if (order?.productOrders && Array.isArray(order.productOrders)) {
      return order.productOrders
        .map((item: any) => {
          const name = item.name ?? 'Unknown';
          const quantity = item.quantity ?? 0;
          const price = item.price ?? 0;
          return `${name} x${quantity} (${price.toLocaleString()})`;
        })
        .join(', ');
    }
  
    return '-'; // fallback kalau nggak ada productOrders
  }
  

  startDatetoexcel: Date = new Date();;  // format: 'YYYY-MM-DD'
  endDatetoeexcel: Date = new Date();;



  exportToExcel(): void {


    // Pastikan startDatetoexcel dan endDatetoeexcel adalah objek Date
    const startDate = new Date(this.startDatetoexcel);
    const endDate = new Date(this.endDatetoeexcel);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    console.log("ini start ",startDateStr,", ini end ",endDateStr)
    
    // Filter data sesuai dengan rentang tanggal
    const filteredData = this.Historyorder.filter((order: any) => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate >= startDateStr && orderDate <= endDateStr;
    });

    // Convert filtered data ke format Excel
    const exportData = filteredData.map((order: any) => ({
      Code: order.code,
      Customer: order.customerName,
      subtotal: order.subTotalPrice,
      tax: order.tax,
      Total: order.totalPrice,
      paymentStatus: order.paymentStatus,
      Created: order.createdAt,
      paymentPaidAt: order.paymentPaidAt,
      deliveredAt: order.deliveredAt,
      productOrders:  this.getDetailOrder(order)
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Orders': worksheet }, SheetNames: ['Orders'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Auto width kolom
    const wscols = Object.keys(exportData[0]).map(k => ({ wch: 30 }));
    worksheet['!cols'] = wscols;
    this.saveAsExcelFile(excelBuffer, `Orders_${startDateStr}_to_${endDateStr}`);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }



    // menu search text
    searchText: string = '';

}


const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
