import { Component } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {
  constructor(
    private loaderService: LoaderService
  ){}

  async ngOnInit() {

    this.loaderService.show();
    this.loaderService.hideWithDelay(1000);
  }


}
