import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-parent-autentication',
  templateUrl: './parent-autentication.component.html',
  styleUrls: ['./parent-autentication.component.css']
})
export class ParentAutenticationComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) {}
    
      ngOnInit() {
        this.loaderService.isLoading.subscribe((loading) => {
          setTimeout(() => {  
            this.isLoading = loading; // ✅ Panggil toast setelah delay
          });
        });
      }
    
}
