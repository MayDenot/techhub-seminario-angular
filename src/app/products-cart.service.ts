import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Product} from './product-list/Product';
import {StorageService} from './storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {
  private _cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(private storageService: StorageService) {
    this._initializeCart();
  }

  private _initializeCart(): void {
    const savedCart = this.storageService.getItem('cart');
    this._cartItems = savedCart ? JSON.parse(savedCart) : [];
    this._emitCartUpdate();
  }

  private _emitCartUpdate(): void {
    const cartCopy = JSON.parse(JSON.stringify(this._cartItems));
    this.cartSubject.next(cartCopy);
    this.storageService.setItem('cart', JSON.stringify(cartCopy));
  }

  addToCart(product: Product): void {
    const existingProduct = this._cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.amount += product.amount || 1;
    } else {
      this._cartItems.push({...product, amount: product.amount || 1});
    }

    this._emitCartUpdate();
  }

  removeFromCart(productId: number): void {
    this._cartItems = this._cartItems.filter(item => item.id !== productId);
    this._emitCartUpdate();
  }
}
