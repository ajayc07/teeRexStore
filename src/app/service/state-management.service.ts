import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {

  public cartState: BehaviorSubject<any>;

  constructor() { 
    this.cartState = new BehaviorSubject({cartItem: [], cartItemCount: 0})
  }


  /**
   * Setter method to set the state of the cart
   * To be accessed across the application
   * @param {*} state
   * @memberof StateManagementService
   */
  public setCartState(state: any): void {
    
    const cartItemCount = state.cartItem.reduce((acc: any, curr: any) => {
      return acc = acc + (curr.cartAddedQuantity)
    },0);
    state['cartItemCount'] = cartItemCount;

    this.cartState.next(Object.assign({}, state));
  }


  /**
   * Getter method to access the cart state
   * To be accessed across the application
   * @return {*}  {Observable<any>}
   * @memberof StateManagementService
   */
  public getCartState(): Observable<any> {
    return this.cartState.asObservable();
  }
}
