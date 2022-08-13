import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { Product } from '../model/product-model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getProductData(): Observable<Product[]> {
    const url = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';
    return this._httpClient.get<Product[]>(url);
  }
}
