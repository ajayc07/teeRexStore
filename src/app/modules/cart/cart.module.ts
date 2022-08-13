import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './component/cart/cart.component';
import { CartItemComponent } from './component/cart-item/cart-item.component';
import { CartSummaryComponent } from './component/cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    CartSummaryComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
