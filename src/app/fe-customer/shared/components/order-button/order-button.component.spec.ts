import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderButtonComponent } from './order-button.component';

describe('OrderButtonComponent', () => {
  let component: OrderButtonComponent;
  let fixture: ComponentFixture<OrderButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderButtonComponent]
    });
    fixture = TestBed.createComponent(OrderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
