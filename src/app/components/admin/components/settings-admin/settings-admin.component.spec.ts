import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAdminComponent } from './settings-admin.component';

describe('SettingsAdminComponent', () => {
  let component: SettingsAdminComponent;
  let fixture: ComponentFixture<SettingsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsAdminComponent]
    });
    fixture = TestBed.createComponent(SettingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
