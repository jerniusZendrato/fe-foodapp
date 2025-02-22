import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassierOrderComponent } from './cassier-order.component';

describe('CassierOrderComponent', () => {
  let component: CassierOrderComponent;
  let fixture: ComponentFixture<CassierOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CassierOrderComponent]
    });
    fixture = TestBed.createComponent(CassierOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
