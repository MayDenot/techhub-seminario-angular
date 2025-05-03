import { Component } from '@angular/core';
import { Product } from '../product-list/Product';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  productsInCart: Product[] = [
    {
      name: 'Teclado Redragon Kumara K552',
      price: 10000,
      stock: 15,
      image: 'tecladokumara.jpeg',
      clearance: false,
      amount: 0,
    },
  ]
}
