import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { StateManagementService } from 'src/app/service/state-management.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public routeLinkConfig = [
    {
      displayName: 'Product',
      imgSrc:'./assets/icons/shirt-solid.svg',
      routeLink: '/product'
    },
    {
      displayName: 'Cart',
      imgSrc:'./assets/icons/cart-shopping-solid.svg',
      routeLink: '/cart'
    },
  ];

  private _compActive: boolean = true;

  public cartItemCount: any;

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
   * @memberof HeaderComponent
   */
  public getCartState(): void {
    this.stateManagementService.getCartState().pipe(
      takeWhile(() => this._compActive)
    ).subscribe((data: any) => {
      this.cartItemCount = data?.cartItemCount;
    })
  }

}
