import { Component } from '@angular/core';
import { Product } from './Product';
import {ProductsCartService} from '../products-cart.service';
import {ProductsDataService} from '../products-data.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private cart: ProductsCartService,
    private productsDataService: ProductsDataService) {
  }

  ngOnInit() {
    this.productsDataService.products$.subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    if (product.amount != 0) {
      this.cart.addToCart(product);
      product.stock -= product.amount;
      product.amount = 0;
    }
  }

  maxReached(msj: string) {
    alert(msj);
  }
}
