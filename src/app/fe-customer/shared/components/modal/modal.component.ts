import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div #modalElement class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" [ngClass]="position === 'center' ? 'modal-dialog-centered' : ''">
        <div class="modal-content text-center">  
          <div class="modal-header">
            <h5 [ngClass]="titleColor || 'text-dark'" class="fw-bold modal-title w-100">{{ title }}</h5>
            <button type="button" class="btn-close" (click)="closeModal()" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <ng-content></ng-content>
          </div>

          <div class="modal-footer justify-content-around">
            <button 
              [ngClass]="cancelButtonClass || 'btn btn-secondary'"
              (click)="onCancel()">
              {{ cancelButtonText }}
            </button>
            <button 
              [ngClass]="confirmButtonClass || 'btn btn-primary'"
              (click)="onConfirm()">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements AfterViewInit {
  @Input() title = '';
  @Input() titleColor = '';
  @Input() confirmButtonClass = '';  
  @Input() cancelButtonClass = '';  
  @Input() confirmButtonText: string = 'Confirm';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() position: 'default' | 'center' = 'default';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  @ViewChild('modalElement', { static: true }) modalElement!: ElementRef;
  private modalInstance: any;

  ngAfterViewInit() {
    const modalEl = this.modalElement.nativeElement;
    this.modalInstance = new (window as any).bootstrap.Modal(modalEl); // Ambil modal dari window.bootstrap
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }

  onConfirm() {
    this.confirm.emit();
    this.closeModal();
  }

  onCancel() {
    this.cancel.emit();
    this.closeModal();
  }
}
