import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  private searchText = new BehaviorSubject<string>('');
  private category = new BehaviorSubject<string>('');

  searchText$ = this.searchText.asObservable();
  category$ = this.category.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(this.getCartCount());
  cartCount$ = this.cartCountSubject.asObservable();

  getCartCount(): number {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  }

  // ===== FORCE REFRESH =====
  refreshCartCount() {
    this.cartCountSubject.next(this.getCartCount());
  }

  setSearchText(value: string) {
    this.searchText.next(value);
  }

  setCategory(value: string) {
    this.category.next(value);
  }
}
