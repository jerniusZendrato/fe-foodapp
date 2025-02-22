import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-parent-cassier-order',
  templateUrl: './parent-cassier-order.component.html',
  styleUrls: ['./parent-cassier-order.component.css']
})
export class ParentCassierOrderComponent {

  isLoading = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

}
