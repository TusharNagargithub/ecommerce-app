import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../base-component/base.component';
import { FormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent extends BaseComponent implements OnDestroy {

  public categories: any[] = [];
  public cart: any[] = [];
  public selectedCategory: string = 'Watch'; // default
  public searchText: string = '';
  public allCategories: any[] = [];
  public isSearchText: boolean = false;
  public isMobileOrTablet = false;

  public filteredCategory: string = '';

  constructor(private productService: ProductService) {
    super();
    this.categories = this.productService.allCategoryProduct;
  }

  ngOnInit(): void {
    this.loadCart();
    this.checkScreen();
    this.allCategories = this.categories;

    this.productService.searchText$.pipe(takeUntil(this.destroy$)).subscribe(search => {
      this.searchText = search;
      this.isSearchText = search.length > 0;
      this.applyFilters();
    });  

    this.productService.category$.pipe(takeUntil(this.destroy$)).subscribe(cat => {
      this.filteredCategory = cat;
      this.applyFilters();
    });

    window.addEventListener('resize', () => this.checkScreen());
  }

  public checkScreen() {
    this.isMobileOrTablet = window.innerWidth < 992;
  }

  private applyFilters(): void {
    let filtered = structuredClone(this.allCategories);

    if (this.filteredCategory && this.filteredCategory !== 'All') {
      filtered = filtered.filter(
        (c: any) =>
          c.name.toLowerCase() === this.filteredCategory.toLowerCase()
      );
    }

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();

      filtered = filtered
        .map((category: any) => {
          const items = category.items.filter((item: any) =>
            item.name.toLowerCase().includes(searchLower)
          );

          return { ...category, items };
        })
        .filter((category: any) => category.items.length > 0);
    }

    this.categories = filtered;
  }

  public setCategory(event: any): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCategory = selectedValue ?? event;
  }

  public chunkProducts(products: any[], chunkSize: number = 2) {
    const result = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      result.push(products.slice(i, i + chunkSize));
    }
    return result;
  }

  

  public getSelectedCategoryData(): any {
    return this.categories.find(
      c => c.name.toLowerCase() === this.selectedCategory?.toLowerCase()
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

   public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
