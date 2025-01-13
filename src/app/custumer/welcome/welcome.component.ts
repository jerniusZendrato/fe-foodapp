import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  customerName: string = '';
  nameError: boolean = false;

  constructor(private router: Router) {}

  onOrderClick() {
    if (!this.customerName) {
      this.nameError = true;
    } else {
      this.nameError = false;
      this.router.navigate(['/menu']); // Navigate to the menu
    }

    console.log('this.nameError :>> ', this.nameError);
  }

}
