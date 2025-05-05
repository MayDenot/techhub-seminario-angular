import { Injectable } from '@angular/core';
import {Product} from './product-list/Product';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {
  private _cartList: Product[] = [];
  cartList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this._cartList);

  addToCart(product: Product) {
    let item = this._cartList.find((v1) => v1.name == product.name);
    if (item === undefined) {
      this._cartList.push({... product});
    } else {
      item.amount += product.amount;
    }
    this.cartList.next(this._cartList);
  }
}
