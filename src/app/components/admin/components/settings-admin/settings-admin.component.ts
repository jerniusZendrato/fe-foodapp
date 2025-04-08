import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.css']
})
export class SettingsAdminComponent implements OnInit {
  async ngOnInit() {

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




}
