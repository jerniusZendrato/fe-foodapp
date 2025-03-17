import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-parent-kitchen-order',
  templateUrl: './parent-kitchen-order.component.html',
  styleUrls: ['./parent-kitchen-order.component.css']
})
export class ParentKitchenOrderComponent {
    isLoading = false;
  
    constructor(private loaderService: LoaderService) {}
  
    ngOnInit() {
      this.loaderService.isLoading.subscribe((loading) => {
        this.isLoading = loading;
      });
    }
  

}
