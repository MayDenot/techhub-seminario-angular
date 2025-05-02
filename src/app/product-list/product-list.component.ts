import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products = [
    {
    "name": 'Teclado Redragon Kumara K552',
    "price": 10000,
    "stock": 15,
    "image": "/assets/images/tecladokumara.jpeg"
    },
    {
      "name": 'Monitor Noblex 22 Pulgadas',
      "price": 150000,
      "stock": 5,
      "image": "/assets/images/monitornoblex22pulg.webp"
    }
  ]
}
