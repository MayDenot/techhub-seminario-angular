import {Component, inject} from '@angular/core';
import { Product } from '../product-list/Product';
import { ProductsCartService } from '../products-cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartList$: Observable<Product[]>;

  constructor(private cartService: ProductsCartService) {
    this.cartList$ = cartService.cart$;
  }

  removeProduct(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
