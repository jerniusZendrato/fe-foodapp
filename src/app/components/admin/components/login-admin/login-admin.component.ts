import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AdminLogin } from '../../models/admin-login.model';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  async ngOnInit() {

  }
  constructor(
    private loaderService: LoaderService,
    private loginservice: LoginService,
    private router: Router
  ){}

  user_id: string = ''
  password: string =''

  public datalogin: AdminLogin[] = []

  login(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.loginservice.loginservice(this.user_id,this.password).subscribe({
        next: (Response: any) =>{
          if(Response.isSuccess === true){
            this.datalogin = Response.data
            this.showsuccessToast()
            this.router.navigate(['/admin']);
          }
          else{
          this.showErrorToast()
          console.log("data tidak isSuccess=true")
          }
        },
        error: (err: any) => {
          console.error('Terjadi error:', err);
          this.showErrorToast()
        }}
      )
      this.loaderService.hideWithDelay(1000);
    })
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
