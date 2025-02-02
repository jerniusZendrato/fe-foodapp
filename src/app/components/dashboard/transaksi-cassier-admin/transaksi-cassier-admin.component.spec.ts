import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaksiCassierAdminComponent } from './transaksi-cassier-admin.component';

describe('TransaksiCassierAdminComponent', () => {
  let component: TransaksiCassierAdminComponent;
  let fixture: ComponentFixture<TransaksiCassierAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaksiCassierAdminComponent]
    });
    fixture = TestBed.createComponent(TransaksiCassierAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
