import { Component } from '@angular/core';
import { Product } from '../product-list/Product';
import {ProductsCartService} from '../products-cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartList$: Observable<Product[]>;
  count: number = 0;

  ngOnInit() {
    this.cartList$.subscribe(cart => this.count = cart.length);
    console.log(this.count);
  }

  constructor(private cart: ProductsCartService) {
    this.cartList$ = cart.cartList.asObservable();
  }
}
