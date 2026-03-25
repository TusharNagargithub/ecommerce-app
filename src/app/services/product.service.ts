import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  private searchText = new BehaviorSubject<string>('');
  private category = new BehaviorSubject<string>('');

  public searchText$ = this.searchText.asObservable();
  public category$ = this.category.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(this.getCartCount());
  public cartCount$ = this.cartCountSubject.asObservable();

  public shopByCategories  = [
    { name: 'Technology' },
    { name: 'Watch' },
    { name: 'Cosmetics' },
    { name: 'Food' },
    { name: 'Real Estate' }
  ];

  public allCategoryProduct = [
      {
        name: 'Technology',
        filters: ['all', 'smart watch', 'laptop', 'tablet', 'desktop', 'accessories'],
        selectedFilter: 'all',
        icon: 'bi-laptop',
        items: [
          {
            id: 16,
            name: 'Apple Macbook Pro 2019 MWP42SA/A',
            price: 2013.54,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Minie Li',
            tag: 'Favorite',
            type: 'laptop'
          },
          {
            id: 17,
            name: 'Apple Watch Series 5 MWV62VN/A',
            price: 517.79,
            oldPrice: 609.00,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: '247 Store',
            tag: '-15%',
            type: 'smart watch'
          },
          {
            id: 18,
            name: 'Apple Macbook Air MWTJ2SA/A (2020)',
            price: 1099,
            oldPrice: 1193.71,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Kimpine Calculator',
            tag: null,
            type: 'laptop'
          },
          {
            id: 19,
            name: 'Apple Watch Series 5 MWV62VN/A',
            price: 193.31,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Kimpine Calculator',
            tag: 'Sold Out',
            type: 'smart watch'
          },
          {
            id: 20,
            name: 'Logitech B175 Wireless Office Mouse',
            price: 15.86,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Minie Li',
            tag: null,
            type: 'accessories'
          },
          {
            id: 21,
            name: 'Apple Macbook Pro 2019 MWP42SA/A',
            price: 2013.54,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Flower In',
            tag: null,
            type: 'laptop'
          }
        ]
      },
      {
        name: 'Watch',
        filters: ['all', 'men', 'women', 'smart'],
        selectedFilter: 'all',
        icon: 'bi-smartwatch',
        items: [
          {
            id: 1,
            name: 'Apple Watch Series 5',
            price: 514.51,
            oldPrice: 259.24,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Minie Li',
            tag: '-49%',
            type: 'smart'
          },
          {
            id: 2,
            name: 'Hand Watch Rossini',
            price: 146.71,
            oldPrice: 94.32,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd SMART MARKETING',
            tag: '-12%',
            type: 'men'
          },
          {
            id: 3,
            name: 'Hand Watch Swiss Alpine',
            price: 215.31,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd SMART MARKETING',
            tag: 'New',
            type: 'men'
          },
          {
            id: 4,
            name: 'Watch For Woman Larmes',
            price: 73.01,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Mobile World',
            tag: 'New',
            type: 'women'
          },
          {
            id: 5,
            name: 'Citizen BI5000',
            price: 66.79,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Minie Li',
            tag: null,
            type: 'men'
          }
        ]
      },

      {
        name: 'Cosmetics',
        filters: ['all', 'lotion', 'mask', 'serum'],
        selectedFilter: 'all',
        icon: 'bi-droplet-half',
        items: [
          {
            id: 6,
            name: 'CIC2 Skin Decode Kit',
            price: 690.38,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'CO., LTD Baby Girl',
            tag: 'New',
            type: 'mask'
          },
          {
            id: 7,
            name: 'Angel Whitening Lotion',
            price: 132.90,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Beautiful Face',
            tag: 'Favorite',
            type: 'lotion'
          },
          {
            id: 8,
            name: 'Sunscreen Moisturizing',
            price: 69.04,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'CO., LTD Baby Girl',
            tag: 'Sold Out',
            type: 'lotion'
          },
          {
            id: 9,
            name: 'Anti-allergy Serum',
            price: 132.90,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Co., Ltd Byware Cosmetic',
            tag: null,
            type: 'serum'
          }
        ]
      },

      {
        name: 'Real Estate',
        filters: ['all', 'apartment', 'villa', 'office'],
        selectedFilter: 'all',
        icon: 'bi-house-door',
        items: [
          {
            id: 10,
            name: 'Luxury Apartment',
            price: 500000,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Dream Homes',
            tag: 'New',
            type: 'apartment'
          },
          {
            id: 11,
            name: 'Modern Villa',
            price: 1200000,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Elite Estates',
            tag: 'Favorite',
            type: 'villa'
          },
          {
            id: 12,
            name: 'Office Space',
            price: 300000,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Business Hub',
            tag: null,
            type: 'office'
          }
        ]
      },

      {
        name: 'Luxury Food',
        filters: ['all', 'sweet', 'snack', 'drink'],
        selectedFilter: 'all',
        icon: 'bi-cup-straw',
        items: [
          {
            id: 13,
            name: 'Premium Chocolate Box',
            price: 50,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Sweet Factory',
            tag: 'New',
            type: 'sweet'
          },
          {
            id: 14,
            name: 'Dry Fruit Mix',
            price: 80,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Healthy Foods',
            tag: 'Favorite',
            type: 'snack'
          },
          {
            id: 15,
            name: 'Organic Juice',
            price: 30,
            image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
            vendor: 'Nature Fresh',
            tag: null,
            type: 'drink'
          }
        ]
      }
  ];

  public getCartCount(): number {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  }

  // ===== FORCE REFRESH =====
  public refreshCartCount(): void {
    this.cartCountSubject.next(this.getCartCount());
  }

  public setSearchText(value: string): void {
    this.searchText.next(value);
  }

  public setCategory(value: string): void {
    this.category.next(value);
  }
}
