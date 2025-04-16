import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { UserAdminServiceService } from '../../services/user-admin-service.service';
import { addUserAdmin, UserAdmin } from '../../models/user-admin.model';

@Component({
  selector: 'app-manajemen-user',
  templateUrl: './manajemen-user.component.html',
  styleUrls: ['./manajemen-user.component.css']
})
export class ManajemenUserComponent implements OnInit {

  ngOnInit(): void {
      this.loadtable()
  }

  constructor(
        private loaderService: LoaderService,
        private userAdminserviceService: UserAdminServiceService
  ){}

  public user: UserAdmin[] = []
  loadtable(): Promise<void>{
      return new Promise((resolve, reject) => {
        this.loaderService.show();
        this.userAdminserviceService.getuser().subscribe(
          (Response: UserAdmin[]) => {
            if (Response) {
              this.user = Response
              console.log("this.table",this.user)
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

    // menu search text
    searchText: string = '';




  role: string[] = ["SUPER_ADMIN", "CASSIER_ADMIN", "KITCHEN_ADMIN"];
  selectedRole: string = ''
  birthuser: string= '';
  username: string = ''
  // mungkin berguna
  private dataadduser: UserAdmin[]= []

  adduser():Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      if(this.username && this.birthuser && this.selectedRole){
      this.userAdminserviceService.adduser(this.username, this.birthuser, this.selectedRole).subscribe(
        (Response: UserAdmin[]) => {
          if (Response) {
            this.dataadduser = Response
            console.log("this.table",this.user)
            this.loadtable()
            this.loaderService.hideWithDelay(1000);
            // hapus data di variabel tampungan
            this.selectedRole = ''
            this.username=''
            this.birthuser= ''

            resolve();
          }
          else
            console.log("data tidak isSuccess=true")
            this.loaderService.hideWithDelay(1000);
          reject()
        }

      )}
    })
  }

  notifdeleteuser(name:string): boolean{
    return confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`);
  }

  deleteuser(id: string, nameuser: string):Promise<void>{
    return new Promise((resolve, reject) => {
      if(this.notifdeleteuser(nameuser)){
        this.loaderService.show();
        this.userAdminserviceService.deleteuser(id).subscribe({
          next: () => {
            this.showsuccessToast()
            console.log(`${nameuser} has been deleted.`);
            this.adduser()
            this.loaderService.hideWithDelay(500);
          },
          error: (err) => {
            console.error('Error deleting product:', err);
          this.showErrorToast()
          this.loaderService.hideWithDelay(500);
          }
        })

      }
    })
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





}
