import { Injectable } from '@angular/core';
import {Product} from './product-list/Product';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private _cartList: Product[] = [];
  cartList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this._cartList);

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem(this.STORAGE_KEY);
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        this.cartList.next(cartItems);
      }
    } catch (error) {
      console.error('Error al cargar el carrito en el almacenamiento: ', error);
    }
  }

  private saveCartToStorage(cartItems: Product[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar carrito en el almacenamiento:', error);
    }
  }

  getCartItems(): Product[] {
    return this.cartList.value;
  }

  addToCart(product: Product) {
    this.getCartItems();
    let item = this._cartList.find((v1) => v1.name == product.name);
    if (item === undefined) {
      this._cartList.push({... product});
    } else {
      item.amount += product.amount;
    }
    this.cartList.next(this._cartList);
    this.saveCartToStorage(this._cartList);
  }

  deleteFromCart(index : number) {
    this.getCartItems();
    if (index >= 0 && index < this._cartList.length) {
      this._cartList.splice(index, 1);
    }
    this.cartList.next(this._cartList);
    this.saveCartToStorage(this._cartList);
  }
}
