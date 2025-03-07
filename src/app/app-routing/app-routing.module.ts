import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesVerifikasiService } from '../guards/unsaved-changes-verifikasi.service';
import { MasterCategoryComponent } from '../components/admin/components/master-category/master-category.component';
import { MasterTableComponent } from '../components/admin/components/master-table/master-table.component';
import { ParentAdminComponent } from '../components/admin/parent-admin/parent-admin.component';
import { MasterHomeComponent } from '../components/admin/components/master-home/master-home.component';
import { MasterProductComponent } from '../components/admin/components/master-product/master-product.component';
import { TransactionCassierAdminComponent } from '../components/admin/components/transaction-cassier-admin/transaction-cassier-admin.component';
import { ParentCassierOrderComponent } from '../components/admin/parent-cassier-order/parent-cassier-order.component';
import { CassierOrderComponent } from '../components/admin/components/cassier-order/cassier-order.component';
import { WelcomeComponent } from '../fe-customer/pages/welcome/welcome.component';
import { FeCustomerComponent } from '../fe-customer/fe-customer.component';
import { MenuComponent } from '../fe-customer/pages/menu/menu.component';
import { CartComponent } from '../fe-customer/pages/cart/cart.component';
import { LayoutComponent } from '../fe-customer/shared/components/layout/layout.component';
import { OrderSummaryComponent } from '../fe-customer/pages/order-summary/order-summary.component';
import { OrderHistoryComponent } from '../fe-customer/pages/order-history/order-history.component';
import { OrderHistoryDetailComponent } from '../fe-customer/pages/order-history-detail/order-history-detail.component';
import { TransactionKitchenAdminComponent } from '../components/admin/components/transaction-kitchen-admin/transaction-kitchen-admin.component';
import { TransactionHistoryComponent } from '../components/admin/components/transaction-history/transaction-history.component';
import { NotFoundComponent } from '../fe-customer/pages/not-found/not-found.component';
import { NavbarComponent } from '../fe-customer/shared/components/navbar/navbar.component';


const feCustomerChildren: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: MenuComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'order/summary', component: OrderSummaryComponent },
  { path: 'history', component: OrderHistoryComponent },
  { path: 'history/:id', component: OrderHistoryDetailComponent },
];

const routes: Routes = [
  {
    path: 'admin',
    component: ParentAdminComponent,
    children: [
      {
        path: '',
        component: MasterHomeComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
      // { path: 'home', component: DashboardMenuComponent },
      {
        path: 'product',
        component: MasterProductComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
      {
        path: 'category',
        component: MasterCategoryComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
      {
        path: 'table',
        component: MasterTableComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
      {
        path: 'cassier-admin',
        component: TransactionCassierAdminComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
      {path: 'kitchen-admin',
        component: TransactionKitchenAdminComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
      {
        path: 'history',
        component: TransactionHistoryComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
    ]
  },
  
  {
    path: 'post',
    component: ParentCassierOrderComponent,
    children: [
      {
        path: '',
        component: CassierOrderComponent,
        canDeactivate: [UnsavedChangesVerifikasiService],
      },
    ],
  },
  {
    path: '',
    component: FeCustomerComponent,
    children: feCustomerChildren,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
