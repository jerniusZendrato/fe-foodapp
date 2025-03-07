import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DerectService } from '../../services/derect.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  @Input() showLogoAndNavBarIconComponent: boolean = true;
  @Input() isLoading: boolean = false;
  @Output() goBack = new EventEmitter<void>();

  constructor(public derect: DerectService) {}

  onGoBack() {
    if (this.goBack.observed) {
      this.goBack.emit();
    } else {
      this.derect.toMenuPage();
    }
  }
}
