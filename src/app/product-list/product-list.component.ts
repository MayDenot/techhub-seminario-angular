import { Component } from '@angular/core';
import { Product } from './Product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [
    {
      name: 'Teclado Redragon Kumara K552',
      price: 10000,
      stock: 15,
      image: 'tecladokumara.jpeg',
      clearance: false,
      amount: 0,
    },
    {
      name: 'Monitor Noblex 22 Pulgadas',
      price: 150000,
      stock: 5,
      image: 'monitornoblex22pulg.webp',
      clearance: true,
      amount: 0,
    },
    {
      name: 'Mouse Logitech G Series Lightspeed G305',
      price: 24000,
      stock: 0,
      image: 'mouselogitechg305.webp',
      clearance: false,
      amount: 0,
    }
  ]

  maxReached(msj: string) {
    alert(msj);
  }
}
