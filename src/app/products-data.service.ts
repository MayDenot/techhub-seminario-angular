import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-list/Product';
import { Observable, tap } from 'rxjs';

const URL = 'https://666af3047013419182d1998a.mockapi.io/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(URL).pipe(
      tap((products: Product[]) => products.forEach(product => product.amount = 0))
    );
  }
}
