import { Injectable } from '@angular/core';
import { Product } from './product-list/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {
  private _cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      this._cartItems = JSON.parse(savedCart);
      this.emitCartUpdate();
    }
  }

  private emitCartUpdate(): void {
    // Crear una NUEVA referencia del array para forzar detección de cambios
    this.cartSubject.next([...this._cartItems]);
    localStorage.setItem('shopping_cart', JSON.stringify(this._cartItems));
  }

  addToCart(product: Product): void {
    const existingIndex = this._cartItems.findIndex(p => p.id === product.id);

    if (existingIndex >= 0) {
      // Producto existe, actualizar cantidad
      this._cartItems[existingIndex].amount += product.amount || 1;
    } else {
      // Producto nuevo, agregar al carrito
      this._cartItems.push({...product, amount: product.amount || 1});
    }

    this.emitCartUpdate(); // <-- Esto dispara la actualización
  }

  removeFromCart(productId: number): number {
    const index = this._cartItems.findIndex(p => p.id === productId);
    if (index >= 0) {
      const amount = this._cartItems[index].amount;
      this._cartItems.splice(index, 1);
      this.emitCartUpdate();
      return amount;
    }
    return 0;
  }
}
