import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAutenticationComponent } from './parent-autentication.component';

describe('ParentAutenticationComponent', () => {
  let component: ParentAutenticationComponent;
  let fixture: ComponentFixture<ParentAutenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentAutenticationComponent]
    });
    fixture = TestBed.createComponent(ParentAutenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
