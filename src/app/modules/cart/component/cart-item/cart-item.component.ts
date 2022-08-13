import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product-model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input()
  public cartItem?: Product;

  @Output()
  public updateCart = new EventEmitter();
  
  @Output()
  public deleteCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * Emit's cart item updated count event
   * @param {boolean} doIncrease
   * @memberof CartItemComponent
   */
  public updateItemCount(doIncrease: boolean) : void{
    this.updateCart.emit(doIncrease);
  }


  /**
   * Emit's cart item delete event
   * @memberof CartItemComponent
   */
  public deleteCartItem() : void{
    this.deleteCart.emit();
  }

}
