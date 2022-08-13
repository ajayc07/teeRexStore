import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/component/cart/cart.component';


const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('../app/modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('../app/modules/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
