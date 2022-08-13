import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product-model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() productData?: Product;

  @Output() addToCartEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * Emit's add to cart event
   * @memberof ProductCardComponent
   */
  public addToCart(): void {
    this.addToCartEvent.emit()
  }


  /**
   * Returns remaining stock count of the item
   * @readonly
   * @type {number}
   * @memberof ProductCardComponent
   */
  get remainingStock(): number {
    const cartAddedQuantity = this.productData?.cartAddedQuantity ?? 0;
    const stock: number = this.productData ? (this.productData.quantity - cartAddedQuantity) : 0;
    return stock;
  }

}
