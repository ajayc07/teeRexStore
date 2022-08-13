import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';

import { ProductComponent } from './component/product/product.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { FiltersComponent } from 'src/app/shared/component/filters/filters.component';
import { SearchComponent } from 'src/app/shared/component/search/search.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductCardComponent,
    FiltersComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
