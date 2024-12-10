import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoading = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
  title = 'fe-foodapp';
}

