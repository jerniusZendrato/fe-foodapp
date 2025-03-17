import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentKitchenOrderComponent } from './parent-kitchen-order.component';

describe('ParentKitchenOrderComponent', () => {
  let component: ParentKitchenOrderComponent;
  let fixture: ComponentFixture<ParentKitchenOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentKitchenOrderComponent]
    });
    fixture = TestBed.createComponent(ParentKitchenOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
