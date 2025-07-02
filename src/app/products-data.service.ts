import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-list/Product';
import {BehaviorSubject, Observable, tap} from 'rxjs';

const URL = 'https://666af3047013419182d1998a.mockapi.io/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  private products = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(URL).pipe(
      tap((products: Product[]) => products.forEach(product => product.amount = 0))
    );
  }

  postProduct(product: Product) : Observable<Product> {
    this.loadingSubject.next(true);
    return this.http.post<Product>(URL, product).pipe(
      tap(newProduct => {
        const currentProducts = this.products.value;
        this.products.next([...currentProducts, newProduct]);
        this.loadingSubject.next(false);
      })
    );
  };
}
