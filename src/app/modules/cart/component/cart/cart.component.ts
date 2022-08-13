import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Product } from 'src/app/model/product-model';
import { StateManagementService } from 'src/app/service/state-management.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  private _compActive: boolean = true;

  public cartItem: any;

  public cartItemCount = 0;

  constructor(
    private stateManagementService: StateManagementService,
  ) { }

  ngOnInit(): void {
    this.getCartState();
  }

  ngOnDestroy(): void {
    this._compActive = false;
  }


  /**
   * Subject subscription to get state data
   * @memberof CartComponent
   */
  public getCartState(): void {
    this.stateManagementService.getCartState().pipe(
      takeWhile(() => this._compActive)
    ).subscribe((data: any) => {
      this.cartItem = data.cartItem
      this.cartItemCount = data.cartItemCount;
    })
  }


  /**
   * Updates cart's item count
   * @param {boolean} doIncrease
   * @param {Product} product
   * @memberof CartComponent
   */
  public updateCartItemCount(doIncrease: boolean, product: Product): void {
    const findUpdateItem: Product = this.cartItem.find((data: any) => data.id === product.id);
    findUpdateItem.cartAddedQuantity =  doIncrease ?  ++findUpdateItem.cartAddedQuantity : --findUpdateItem.cartAddedQuantity;
    this.stateManagementService.setCartState({cartItem: this.cartItem});
  }


  /**
   * Remove item from cart.
   * @param {number} productId
   * @memberof CartComponent
   */
  public deleteCartItem(productId: number) {
    this.cartItem = this.cartItem.filter((cartItem: Product) => cartItem.id != productId);
    this.stateManagementService.setCartState({cartItem: this.cartItem});
  }


  /**
   * Calculates total cart value
   * @readonly
   * @type {number}
   * @memberof CartComponent
   */
  get total(): number {
    return this.cartItem?.reduce((acc: any, curr: any) => {
      return acc = acc + (curr.cartAddedQuantity * curr.price)
    },0)
  }
}
