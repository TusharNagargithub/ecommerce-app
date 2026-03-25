import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CategoryFilterComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 public isSearching:boolean = false;
 constructor(private productService: ProductService) {
  this.productService.searchText$.subscribe(text => {
    this.isSearching = text.length > 0;
  });
 }
}
