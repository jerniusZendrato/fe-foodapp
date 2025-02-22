import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-master-home',
  templateUrl: './master-home.component.html',
  styleUrls: ['./master-home.component.css']
})
export class MasterHomeComponent {
  constructor(
    private loaderService: LoaderService
  ){}

  async ngOnInit() {

    this.loaderService.show();
    this.loaderService.hideWithDelay(1000);
  }


}
