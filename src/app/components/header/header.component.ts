import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ProductService } from '../../services/product.service';
import { BaseComponent } from '../../base-component/base.component';
import { takeUntil } from 'rxjs';

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
export class HeaderComponent extends BaseComponent implements OnDestroy {
  constructor(private productService: ProductService){
    super();
  }

  public cartCount: number = 0;
  public searchText: string = '';
  public selectedCategory: string = '';
  public categories: any = [];

  ngOnInit() {
    this.productService.cartCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.cartCount = count;
    });
    this.categories = this.productService.shopByCategories;
  }
  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public onSearch(): void {
    this.productService.setSearchText(this.searchText);
    this.productService.setCategory(this.selectedCategory);
  }  
}