import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MasterProductComponent } from './components/admin/components/master-product/master-product.component';
import { ParentAdminComponent } from './components/admin/parent-admin/parent-admin.component';
import { ParentCassierOrderComponent } from './components/admin/parent-cassier-order/parent-cassier-order.component';
import { TransactionCassierAdminComponent } from './components/admin/components/transaction-cassier-admin/transaction-cassier-admin.component';
import { TransactionKitchenAdminComponent } from './components/admin/components/transaction-kitchen-admin/transaction-kitchen-admin.component';
import { TransactionHistoryComponent } from './components/admin/components/transaction-history/transaction-history.component'
import { MasterCategoryComponent } from './components/admin/components/master-category/master-category.component';
import { MasterTableComponent } from './components/admin/components/master-table/master-table.component';
import { SidebarComponent } from './components/admin/shared/sidebar/sidebar.component';
import { MasterHomeComponent } from './components/admin/components/master-home/master-home.component';
import { DashboardComponent } from './components/admin/shared/dashboard/dashboard.component';
import { LoaderComponent } from './components/admin/shared/loader/loader.component';
import { CassierOrderComponent } from './components/admin/components/cassier-order/cassier-order.component';
import { WelcomeComponent } from './fe-customer/pages/welcome/welcome.component';
import { FeCustomerComponent } from './fe-customer/fe-customer.component';
import { MenuComponent } from './fe-customer/pages/menu/menu.component';
import { ProductCardComponent } from './fe-customer/shared/components/product-card/product-card.component';
import { CheckOutButtonComponent } from './fe-customer/shared/components/check-out-button/check-out-button.component';
import { CartComponent } from './fe-customer/pages/cart/cart.component';
import { LayoutComponent } from './fe-customer/shared/components/layout/layout.component';
import { ModalComponent } from './fe-customer/shared/components/modal/modal.component';
import { OrderSummaryComponent } from './fe-customer/pages/order-summary/order-summary.component';
import { OrderHistoryComponent } from './fe-customer/pages/order-history/order-history.component';
import { NavbarComponent } from './fe-customer/shared/components/navbar/navbar.component';
import { OrderHistoryCardComponent } from './fe-customer/shared/components/order-history-card/order-history-card.component';
import { OrderHistoryDetailComponent } from './fe-customer/pages/order-history-detail/order-history-detail.component';
import { SpinnerComponentComponent } from './fe-customer/shared/components/spinner-component/spinner-component.component';
import { NotFoundComponent } from './fe-customer/pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterTableComponent,
    MasterProductComponent,
    ParentAdminComponent,
    ParentCassierOrderComponent,
    TransactionCassierAdminComponent,
    TransactionKitchenAdminComponent,
    TransactionHistoryComponent,
    MasterCategoryComponent,
    MasterTableComponent,
    SidebarComponent,
    MasterHomeComponent,
    DashboardComponent,
    LoaderComponent,
    CassierOrderComponent,
    WelcomeComponent,
    FeCustomerComponent,
    MenuComponent,
    ProductCardComponent,
    CheckOutButtonComponent,
    CartComponent,
    LayoutComponent,
    ModalComponent,
    OrderSummaryComponent,
    OrderHistoryComponent,
    NavbarComponent,
    OrderHistoryCardComponent,
    OrderHistoryDetailComponent,
    SpinnerComponentComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,

    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
