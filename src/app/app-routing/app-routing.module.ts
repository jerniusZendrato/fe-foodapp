import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesVerifikasiService } from '../guards/unsaved-changes-verifikasi.service';
import { MasterCategoryComponent } from '../components/admin/components/master-category/master-category.component';
import { MasterTableComponent } from '../components/admin/components/master-table/master-table.component';
import { ParentAdminComponent } from '../components/admin/parent-admin/parent-admin.component';
import { MasterHomeComponent } from '../components/admin/components/master-home/master-home.component';
import { MasterProductComponent } from '../components/admin/components/master-product/master-product.component';
import { TransactionCassierAdminComponent } from '../components/admin/components/transaction-cassier-admin/transaction-cassier-admin.component';

const routes: Routes = [
  {
    path: '',
    component: ParentAdminComponent,
    children: [
      { path: '', component: MasterHomeComponent,  canDeactivate: [UnsavedChangesVerifikasiService] },
      // { path: 'home', component: DashboardMenuComponent },
      { path: 'product', component: MasterProductComponent,  canDeactivate: [UnsavedChangesVerifikasiService]},
      { path: 'category', component:MasterCategoryComponent, canDeactivate: [UnsavedChangesVerifikasiService]},
      { path: 'table', component:MasterTableComponent, canDeactivate: [UnsavedChangesVerifikasiService]},
      { path: 'cassier-admin', component:TransactionCassierAdminComponent, canDeactivate: [UnsavedChangesVerifikasiService]},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
