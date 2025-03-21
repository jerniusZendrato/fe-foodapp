import { Component, HostListener, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { AdminTable } from '../../models/admin-table.model';
// import * as QRCode from 'qrcode-esm';
import { LoaderService } from '../../services/loader.service';
import * as QRCode from 'qrcode-generator';


@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.css']
})
export class MasterTableComponent implements OnInit {
  async ngOnInit() {
    await this.loadtable()

    this.datatableawal()
    
    // // ✅ Subscribe ke BehaviorSubject agar tabel otomatis update
    // this.tableService.table$.subscribe((data) => {
    //   this.table = data;
    // });

    // // ✅ Ambil data pertama kali saat komponen di-load
    // this.tableService.gettable().subscribe();
    
  }
  constructor(
    private tableService: TableService,
    private loaderService: LoaderService

  ){}

  public table: AdminTable[] = []
  loadtable(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.tableService.gettable().subscribe(
        (Response: AdminTable[]) => {
          if (Response) {
            this.table = Response
            console.log("this.table",this.table)
            this.generateQRCodes()
            console.log ("this.generateQRCodes()",this.generateQRCodes())
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
    // const QRCode = (await import('qrcode-generator')).default;
    for (const item of this.table) {
      try {
        console.log("item.qrimageurl",item.urlWelcomePage)
        // Generate QR Code untuk setiap item berdasarkan ID
        if(item.urlWelcomePage){
          const qr = QRCode(0, 'M');
          qr.addData(item.urlWelcomePage);
          qr.make();
          item.qrImage = qr.createDataURL();
      
        }
      } catch (error) {
        console.error('Error generating QR Code', error);
      }
    }
    console.log('Updated Table Data:', this.table); // Debug untuk memastikan QR Code sudah diperbarui
  }


  originalTable: AdminTable[] = [];
  datatableawal(){
    this.originalTable = JSON.parse(JSON.stringify(this.table));
    
  }


  private tableToSave: AdminTable[] = []
  buttonsavetable() :void{
    this.tableToSave = JSON.parse(JSON.stringify(this.changedTable));
    
    const tablesToSave = this.tableToSave.map(table => ({
      id: table.id,
      activated: table.isActivated // Sesuaikan dengan properti yang benar
    }));

    this.loaderService.show(); 
    this.tableService.saveTable(tablesToSave).subscribe(
      (response) => {
        if (response['isSuccess']==true) {
          console.log('All products saved successfully',response);
          this.closeModal();
          this.showsuccessToast()
          this.datatableawal()
        } else {
          console.error('Failed to save products');
          this.refreshTable()
          this.closeModal();
          this.showErrorToast()
        }
        // this.datatableawal()
        this.loaderService.hideWithDelay(2000);
      },
      (error) => {
        console.error('Error saving products:', error);
        this.refreshTable()
        this.closeModal();
        this.showErrorToast()
        // this.datatableawal()
        this.loaderService.hideWithDelay(2000);
      }
    );
  }


  // add table

  // variable berisi nilai dari 1 sampai 99
  selectedTable: number[] = Array.from({ length: 99 }, (_, i) => i + 1);

  // nomor table yang aktif
  notableaktif: number[] = [];

  // nomor table yang bisa di aktifkan
  notableready: number[] = [];

  // mengecek table yang masih tersedia untuk ditambah
  ceknotable():void{

    // Filter hanya yang memiliki `name` bertipe number
    this.notableaktif = this.table
        .filter(t => typeof t.name === "number") // Pastikan name adalah angka
        .map(t => t.name);
      
    console.log("ini this.notableaktif", this.table.filter(t => typeof t.name === "number") // Pastikan name adalah angka
    .map(t => t.name))
    console.log("selectedTable",this.selectedTable)

    // Cari angka yang belum ada di notableAktif dan tambahkan ke notableReady
    this.notableready = this.selectedTable.filter(num => !this.notableaktif.includes(num));
    
  }

  // tampungan untuk menyimpan data yang dipilih
  newtable: number | null = null;

  addtable(): void{
    this.loaderService.show(); 
    const toadd ={
      "name": this.newtable,
     }
     console.log("toadd toadd",JSON.stringify(toadd))
    if(toadd){
      this.tableService.addTable(toadd).subscribe(
        (response) => {
          if (response['isSuccess']==true) {
            console.log('All products saved successfully',response);
            this.closeModal();
            this.showsuccessToast()
            this.datatableawal()
            this.newtable = null;
            
          } else {
            console.error('Failed to save products');
            this.refreshTable()
            this.closeModal();
            this.showErrorToast()
          }
          // this.datatableawal()
          this.loaderService.hideWithDelay(2000);
        },
        (error) => {
          console.error('Error saving products:', error);
          this.refreshTable()
          this.closeModal();
          this.showErrorToast()
          // this.datatableawal()
          this.loaderService.hideWithDelay(2000);
        }
      );
    }
  }



  public allTable: AdminTable[] = []
  changedTable: any[] = [];
  isFormDirty: boolean = false;
  cekstatus(): void{
    this.allTable = JSON.parse(JSON.stringify(this.table));
    if (this.allTable.length !== this.originalTable.length) {
      console.error('Jumlah produk tidak sesuai antara allcategory dan originalcategory');
      return;
    }
    this.changedTable = this.allTable.filter((table, index) => {
      return table.isActivated !== this.originalTable[index].isActivated; // Bandingkan status
  
    });

    if(this.changedTable.length > 0){
      console.log("data ada perubahan", this.changedTable)
      this.isFormDirty = true;
    }
    else{
      console.log("data tidak ada perubahan")
      this.isFormDirty = false;
    }
  }





  cekperubahan(): void{
    this.cekstatus()
    if (this.changedTable.length > 0) {
      const modalElement = document.getElementById('changeModal');
      // jika ada perubahan,  ubah unutk notif
      // this.isFormDirty = true;
      // Jika ada perubahan, buka modal
      const changeModal = new (window as any).bootstrap.Modal(modalElement);
      changeModal.show();
    } else {
      console.log("Tidak ada perubahan.");
    }
  }




  // mencegah kehalaman lain
  canDeactivate(): boolean {
    this.cekstatus()
    if (this.isFormDirty) {
      return confirm('Changes you made may not be saved. Are you sure you want to leave?');
    }
    return true;
  }

  //mencegah reload atau menutup halaman
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.cekstatus();
    if (this.isFormDirty) {
      $event.returnValue = 'Changes you made may not be saved';
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

  selectedtable: string | undefined = undefined;
  selecttable(QRtable: string | undefined): void {
    this.selectedtable = QRtable;
    console.log('Selected Category:', this.selectedtable);
  }
  clearselectedtabel(): void{
    this.selectedtable = undefined;
  }


  refreshTable() {

    this.table = JSON.parse(JSON.stringify(this.originalTable));


  }

}
