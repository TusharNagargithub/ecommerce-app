import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // @Output() searchChange = new EventEmitter<string>();
  // @Output() categoryChange = new EventEmitter<string>();

  // searchText = '';
  // selectedCategory = '';

  // categories = [
  //   { value: 'technology', label: 'Technology' },
  //   { value: 'food', label: 'Food' }
  // ];

  // onSearch(): void {
  //   this.searchChange.emit(this.searchText);
  // }

  // onCategoryChange(): void {
  //   this.categoryChange.emit(this.selectedCategory);
  // }

  // menuOpen = false;

  //   toggleMenu(): void {
  //     this.menuOpen = !this.menuOpen;
  //   }


  // ####################
  constructor(private productService: ProductService){}

  cartCount: number = 0;

  ngOnInit() {
    this.productService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });
  }

  
  searchText: string = '';
selectedCategory: string = '';

// onSearchChange() {
//   this.productService.setSearchText(this.searchText);
// }

// onCategoryChange() {
//   this.productService.setCategory(this.selectedCategory);
// }

onSearch() {
  this.productService.setSearchText(this.searchText);
  this.productService.setCategory(this.selectedCategory);
}

categories = [
  { name: 'Technology' },
  { name: 'Watch' },
  { name: 'Cosmetics' },
  { name: 'Food' },
  { name: 'Real Estate' }
];
}