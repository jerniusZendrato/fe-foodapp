import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { AdminLogin } from '../../models/admin-login.model';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.css']
})
export class SettingsAdminComponent implements OnInit {
  async ngOnInit() {
    this.userlogin()

  }
  constructor(
    private loaderService: LoaderService
  ){}

  menuItems: string[] = ['Edit Profile', 'Change Password'];
  activeItem: string = this.menuItems[0]; // Default aktif

  setActive(item: string) {
    this.activeItem = item;
  }


// fungsi showpassword di edit profile
  showPassword_editprofile = false;
  passwordedit = '';

  showPasswordnow_changepassword = false;
  passwordnow = ''

  showPasswordnew_changepassword = false;
  passwordnew = ''

  showPasswordconf_changepassword = false;
  passwordconf = ''
  // ket = 1 untuk showpassword di edit profile 
  togglePassword(id:number) {
    if (id ===1){
      this.showPassword_editprofile = !this.showPassword_editprofile;
    }
    if (id === 2) {
      this.showPasswordnow_changepassword = !this.showPasswordnow_changepassword;
    }
    if (id === 3) {
      this.showPasswordnew_changepassword = !this.showPasswordnew_changepassword;
    }
    if (id === 4) {
      this.showPasswordconf_changepassword = !this.showPasswordconf_changepassword;
    }
  }

  // mengecek apakah new password sudah sama degna password confirmation
  status = ''
  savechangepassword(newpass: string, confpass: string){
    if(newpass != confpass){
      this.status = '2'
    }else{
      this.status = ''
    }
  }


  datalogin: AdminLogin[]=[]
  
    userlogin(){
      const data = localStorage.getItem('datalogin')
      if (data) {
        this.datalogin = JSON.parse(data);
        console.log("this.datalogin",this.datalogin)
      }
    }


  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
    }
  }



}
