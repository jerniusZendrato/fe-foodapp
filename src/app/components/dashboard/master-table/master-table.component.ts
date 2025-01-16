import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/table.model';
import { LoaderService } from 'src/app/service/loader.service';
import { TableService } from 'src/app/service/table.service';
// import QRCode from 'qrcode';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.css']
})
export class MasterTableComponent implements OnInit{
  async ngOnInit() {
    await this.loadtable()

    this.datatableawal()
    
  }
  constructor(
    private tableService: TableService,
    private loaderService: LoaderService

  ){}

  public table: Table[] = []
  loadtable(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.tableService.gettable().subscribe(
        (Response: Table[]) => {
          if (Response) {
            this.table = Response
            this.generateQRCodes()
            console.log("ini category", this.table)
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

  async generateQRCodes() {
    for (const item of this.table) {
      try {
        // Generate QR Code untuk setiap item berdasarkan ID
        item.qrImageUrl = await QRCode.toDataURL(item.name);
      } catch (error) {
        console.error('Error generating QR Code', error);
      }
    }
    console.log('Updated Table Data:', this.table); // Debug untuk memastikan QR Code sudah diperbarui
  }





  isSecondCheckboxDisabled = true;
  editstatusproduct(event:Event):void{
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isSecondCheckboxDisabled = !isChecked;
    if (!isChecked) {
      this.cekstatus();  // Menjalankan fungsi cekstatus jika checkbox unchecked
      console.log("cek kalau sudah uncheck")
    }
  }

  originalTable: Table[] = [];
  datatableawal(){
    this.originalTable = JSON.parse(JSON.stringify(this.table));
    
  }


  private tableToSave: Table[] = []
  buttonsavecategory() :void{
    this.tableToSave = JSON.parse(JSON.stringify(this.allTable));
    

    this.loaderService.show(); 
    this.tableService.saveTable(this.tableToSave).subscribe(
      (response) => {
        if (response['isSuccess']==true) {
          console.log('All products saved successfully',response);
          this.closeModal();
          this.showsuccessToast()
        } else {
          console.error('Failed to save products');
          this.refreshTable()
          this.closeModal();
          this.showErrorToast()
        }
        this.datatableawal()
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving products:', error);
        this.refreshTable()
        this.closeModal();
        this.showErrorToast()
        this.datatableawal()
        this.loaderService.hideWithDelay(2000);
      }
    );
  }



  public allTable: Table[] = []
  changedTable: any[] = [];
  cekstatus(): void{
    this.allTable = JSON.parse(JSON.stringify(this.table));
    if (this.allTable.length !== this.originalTable.length) {
      console.error('Jumlah produk tidak sesuai antara allcategory dan originalcategory');
      return;
    }
    this.changedTable = this.allTable.filter((table, index) => {
      return table.activated !== this.originalTable[index].activated; // Bandingkan status
  
    });

    if (this.changedTable.length > 0) {
      const modalElement = document.getElementById('changeModal');
      // Jika ada perubahan, buka modal
      const changeModal = new (window as any).bootstrap.Modal(modalElement);
      changeModal.show();
    } else {
      console.log("Tidak ada perubahan.");
    }
  }



  closeModal() {
    const modalElement = document.getElementById('changeModal');
    const changeModal = new (window as any).bootstrap.Modal(modalElement);
    changeModal.hide();
  }
  showErrorToast(): void {
    const toastElement = document.getElementById('errorToast');
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }
  showsuccessToast(): void {
    const toastElement = document.getElementById('successToast');
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }



  // fungsi detail QR

  selectedtable: string | null = null;
  selecttable(QRtable: string): void {
    this.selectedtable = QRtable;
    console.log('Selected Category:', this.selectedtable);
  }
  clearselectedtabel(): void{
    this.selectedtable = null;
  }


  refreshTable() {

    this.table = JSON.parse(JSON.stringify(this.originalTable));


  }


}
