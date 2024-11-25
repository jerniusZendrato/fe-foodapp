import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticationsComponent } from './autentications.component';

describe('AutenticationsComponent', () => {
  let component: AutenticationsComponent;
  let fixture: ComponentFixture<AutenticationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutenticationsComponent]
    });
    fixture = TestBed.createComponent(AutenticationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
