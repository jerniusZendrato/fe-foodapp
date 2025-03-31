import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from '../../services/order-admin.service';
import { LoaderService } from '../../services/loader.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';

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
  
      this.orderadmin.getorder(this.currentDate).subscribe(
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
  

  getPastDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
}

}
