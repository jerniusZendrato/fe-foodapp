import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { UserAdminServiceService } from '../../services/user-admin-service.service';
import { UserAdmin } from '../../models/user-admin.model';

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

}
