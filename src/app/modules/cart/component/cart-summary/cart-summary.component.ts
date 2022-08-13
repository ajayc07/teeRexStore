import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  @Input()
  cartItemCount: number = 0;

  @Input()
  total: number = 0;

  @Input()
  currencySymbol!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
