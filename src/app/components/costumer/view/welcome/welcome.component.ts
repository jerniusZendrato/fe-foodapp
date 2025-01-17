import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/components/costumer/service/order.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  customerName: string = '';
  nameError: boolean = false;

  tableNumber: number | null = null;

  value: string = 'ag';

  showModal: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const url = params['tableNumber'];

      if (url) {
        try {
          this.tableNumber = !isNaN(url) ? url : null;
          this.showModal = isNaN(url);
        } catch (error) {
          console.error('Error extracting number from URL:', error);
          this.tableNumber = null;
          this.showModal = true;
        }
      } else {
        this.tableNumber = null;
        this.showModal = true;
      }
    });
  }

  onOrderClick() {
    if (!this.customerName) {
      this.nameError = true;
    } else {
      this.nameError = false;
      this.orderService.updateNameAndNoTabelOrder(
        this.customerName,
        this.tableNumber ?? 0
      );
      this.router.navigate(['/menu']); // Navigate to the menu
    }

    console.log('this.nameError :>> ', this.nameError);
  }

  saveTableNumber() {
    this.showModal = false;

  }
}
