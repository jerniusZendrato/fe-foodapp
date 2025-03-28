import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableCustService } from '../../shared/services/table-cust.service';
import { TableCust as Table } from '../../shared/models/table-cust.model';
import { OrderLocalStorageCustService } from '../../shared/services/order-local-storage-cust.service';
import { DerectService } from '../../shared/services/derect.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tableService: TableCustService,
    private readonly OrderLocalStorageService: OrderLocalStorageCustService,
    private readonly derect: DerectService
  ) {}

  table!: Table | null;

  tableNo!: number | string;
  tableId!: string;

  

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tableId = params['table-id'];
      if (tableId) {

        this.tableService.getActiveTable(tableId).subscribe({
          next: (table) => {
            this.table = table;
            this.tableNo = table.name;
            this.tableId = table.id;
          },
          error: (error) => {
            console.error('Error fetching table:', error);
            this.table = null;
            this.router.navigate(['/404']);
          },
          complete: () => {
          },
        });
      } else {
        this.router.navigate(['/404']);
      }
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      console.log('name :>> ', name);
      console.log('this.tableId :>> ', this.tableId);
      if (name) {
        this.OrderLocalStorageService.insertNameAndTableNamaAndTableId(name, this.tableId, this.tableNo);
        this.derect.toMenuPage()  
      }
    }
  }
}
