import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryCardComponent } from './order-history-card.component';

describe('OrderHistoryCardComponent', () => {
  let component: OrderHistoryCardComponent;
  let fixture: ComponentFixture<OrderHistoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryCardComponent]
    });
    fixture = TestBed.createComponent(OrderHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
