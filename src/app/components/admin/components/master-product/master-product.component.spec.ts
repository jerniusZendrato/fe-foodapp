import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProductComponent } from './master-product.component';

describe('MasterProductComponent', () => {
  let component: MasterProductComponent;
  let fixture: ComponentFixture<MasterProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProductComponent]
    });
    fixture = TestBed.createComponent(MasterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
