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
  products$ = this.products.asObservable();
  loadingSubject$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    this.loadingSubject.next(true);
    this.getAll().subscribe({
      next: (products) => {
        this.products.next(products);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loadingSubject.next(false);
      }
    });
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(URL).pipe(
      tap((products: Product[]) => products.forEach(product => product.amount = 0))
    );
  }

  postProduct(product: Product) : Observable<Product> {
    this.loadingSubject.next(true);
    return this.http.post<Product>(URL, product).pipe(
      tap({
        next: () => this.loadProducts(),
        error: () => this.loadingSubject.next(false),
        finalize: () => this.loadingSubject.next(false)
      })
    );
  };

  restoreStock(productId : number, amount : number) {
    const productsCurrent = this.products.value;
    const updatedProducts = productsCurrent.map(product =>
      product.id === productId
        ? { ...product, stock: product.stock + amount }
        : product
    );
    this.products.next(updatedProducts);
  }

  addProductToList(product : Product) {
    const productsCurrent = this.products.value;
    this.products.next([...productsCurrent, product]);
  }
}
