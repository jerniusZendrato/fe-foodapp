import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-parent-admin',
  templateUrl: './parent-admin.component.html',
  styleUrls: ['./parent-admin.component.css']
})
export class ParentAdminComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
