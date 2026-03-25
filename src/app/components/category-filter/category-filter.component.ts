import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent {

  public categories: any[] = [];
  public cart: any[] = [];
  public selectedCategory: string = 'Watch'; // default
  public searchText: string = '';
  public allCategories: any[] = [];
  public isSearchText: boolean = false;

  constructor(private productService: ProductService) {
    this.categories = this.productService.allCategoryProduct;
  }

  ngOnInit(): void {
    this.loadCart();
    this.allCategories = this.categories;

    this.productService.searchText$.subscribe(search => {
      this.searchText = search;
      this.isSearchText = search.length > 0;
      if (!search) {
        this.categories = JSON.parse(JSON.stringify(this.allCategories));
        return;
      }
      const searchLower = search.toLowerCase();
      this.categories = this.allCategories
        .map((category: { items: any[]; }) => {
          const filteredItems = category.items.filter(item =>
            item.name.toLowerCase().includes(searchLower)
          );

          return {
            ...category,
            items: filteredItems
          };
        })
        .filter((category: { items: any[]; }) => category.items.length > 0);
    });  
  }

  public setCategory(cat: string): void {
    this.selectedCategory = cat;
  }

  public getSelectedCategoryData(): any {
    return this.categories.find(
      c => c.name.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  public loadCart(): void {
    const data = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : [];
  }

  public addToCart(item: any): void {
    if (!this.isInCart(item)) {
      this.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    this.productService.refreshCartCount();
  }

  public isInCart(item: any): boolean {
    return this.cart.some(c => c.id === item.id || c.id === item);
  }

  public setFilter(category: any, filter: string): void {
    category.selectedFilter = filter;
  }

  public getFilteredItems(category: any): any {
    if (category.selectedFilter === 'all') {
      return category.items;
    }
    return category.items.filter(
      (item: any) => item.type === category.selectedFilter
    );
  }
}
