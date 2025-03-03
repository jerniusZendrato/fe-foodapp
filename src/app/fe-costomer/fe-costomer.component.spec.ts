import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCostomerComponent } from './fe-costomer.component';

describe('FeCostomerComponent', () => {
  let component: FeCostomerComponent;
  let fixture: ComponentFixture<FeCostomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeCostomerComponent]
    });
    fixture = TestBed.createComponent(FeCostomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
