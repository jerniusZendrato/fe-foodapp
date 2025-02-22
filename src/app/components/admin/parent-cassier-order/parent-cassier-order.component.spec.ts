import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCassierOrderComponent } from './parent-cassier-order.component';

describe('ParentCassierOrderComponent', () => {
  let component: ParentCassierOrderComponent;
  let fixture: ComponentFixture<ParentCassierOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentCassierOrderComponent]
    });
    fixture = TestBed.createComponent(ParentCassierOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
