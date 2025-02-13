import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/components/costomer/service/order-costomer.service';
import { TableCostomerService } from '../../service/table-costomer.service';
import { Table } from 'src/app/models/table.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  customerName: string = '';
  nameError: boolean = false;

  tableId: string | null = null;

  tableNum: string | null = null;

  table: Table | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderService: OrderService,
    public tableService: TableCostomerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tableId = params['table-id'];
      if (tableId) {
        console.log('tableId :>> ', tableId);
  
        this.tableService.getTable(tableId).subscribe(
          (table) => {
            this.table = table; 
            // this.tableNum = this.table.name.split(' ')[1];
            console.log('this.table :>> ', this.table);
          },
          (error) => {
            console.error('Error fetching table:', error);
            this.table = null; 
            this.router.navigate(['/404']);
          }
        );
      } else {
        this.table = null; 
      }
    });
  }

  onOrderClick() {
    if (!this.customerName) {
      this.nameError = true;
    } else {
      this.nameError = false;
      this.orderService.updateNameAndNoTabelOrder(this.customerName);
      this.router.navigate(['/menu']);
    }

    console.log('this.nameError :>> ', this.nameError);
  }
}
