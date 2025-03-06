import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: ` <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ text }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ leftButtonLabel }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            (click)="onRightButtonClick()"
          >
            {{ rightButtonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() leftButtonLabel: string = 'Cancel';
  @Input() rightButtonLabel: string = 'OK';
  @Output() rightButtonClick = new EventEmitter<void>();

  onRightButtonClick() {
    this.rightButtonClick.emit();
  }
}
