import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { FooterComponent } from '../../components/home-banner/home-banner.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/footer/footer.component';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../base-component/base.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CategoryFilterComponent, FooterComponent, CommonModule,ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseComponent implements OnDestroy,OnInit {
 public isSearching:boolean = false;
 constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.productService.searchText$.pipe(takeUntil(this.destroy$)).subscribe(text => {
      this.isSearching = text.length > 0;
    });
  }

 override ngOnDestroy(): void {
   super.ngOnDestroy();
 }
}
