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
products = [
  { label: 'New', title: 'Apple Macbook Pro 2019 MWP42SA/A', price: '$2,013.54', image: 'assets/images/default-product.png' },
  { label: 'Favorite', title: 'Apple Watch Series 5 MWV62VN/A', price: '$517.79', image: 'assets/images/default-product.png' },
  { label: '-15%', title: 'Apple Macbook Air MWTJ2SA/A Space Grey', price: '$1,099', image: 'assets/images/default-product.png' },
  { label: 'Sold Out', title: 'Hand Watch Rossini - 5395T01G', price: '$193.31', image: 'assets/images/default-product.png' },
  { label: '', title: 'Apple Macbook Pro MWTJ2SA/A Space Grey', price: '$1,646.34', image: 'assets/images/default-product.png' },
  { label: '', title: 'Apple Macbook Pro 2020 MWP42SA/A', price: '$2,142.98', image: 'assets/images/default-product.png' }
];


  categories: any[] = [];
  cart: any[] = [];
  selectedCategory: string = 'Watch'; // default
  public searchText: string = '';
  private searchCategory: string = '';
  public allCategories: any[] = [];

  public isSearchText: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCart();
    this.productService.searchText$.subscribe(search => {
    console.log('Search:', search);
    this.searchText = search;
    this.isSearchText = search.length > 0;
    this.applyFilter();
  });

  this.productService.category$.subscribe(cat => {
    console.log('Category:', cat);
    this.searchCategory = cat;
    this.applyFilter();
  });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }

  getSelectedCategoryData() {
    return this.categories.find(
      c => c.name.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  public applyFilter() {
    
    if(this.searchCategory){
      this.categories = this.allCategories
        
    }
    if(this.searchText){
      this.categories = this.allCategories
        .map((category: { items: any[]; }) => {
          const filteredItems = category.items.filter(item =>
            item.name.toLowerCase().includes(this.searchText.toLowerCase())
          );

          return {
            ...category,
            items: filteredItems
          };
        })
        .filter((category: { items: any[]; }) => category.items.length > 0); // remove empty categories
    
    }
  }

  // ✅ Load Data
  loadCategories() {
    
    // this.categories = [
    //   {
    //     name: 'Watch',
    //     items: [
    //       {
    //         id: 1,
    //         name: 'Apple Watch Series 5',
    //         price: 514.51,
    //         oldPrice: 259.24,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Minie Li',
    //         tag: '-49%'
    //       },
    //       {
    //         id: 2,
    //         name: 'Hand Watch Rossini',
    //         price: 146.71,
    //         oldPrice: 94.32,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd SMART MARKETING',
    //         tag: '-12%'
    //       },
    //       {
    //         id: 3,
    //         name: 'Hand Watch Swiss Alpine',
    //         price: 215.31,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd SMART MARKETING',
    //         tag: 'New'
    //       },
    //       {
    //         id: 4,
    //         name: 'Watch For Man Larmes',
    //         price: 73.01,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Mobile World',
    //         tag: 'New'
    //       },
    //       {
    //         id: 5,
    //         name: 'Citizen BI5000',
    //         price: 66.79,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Minie Li',
    //         tag: null
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Cosmetics',
    //     items: [
    //       {
    //         id: 6,
    //         name: 'CIC2 Skin Decode Kit',
    //         price: 690.38,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'CO., LTD Baby Girl',
    //         tag: 'New'
    //       },
    //       {
    //         id: 7,
    //         name: 'Angel Whitening Lotion',
    //         price: 132.90,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Beautiful Face',
    //         tag: 'Favorite'
    //       },
    //       {
    //         id: 8,
    //         name: 'Sunscreen Moisturizing',
    //         price: 69.04,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'CO., LTD Baby Girl',
    //         tag: 'Sold Out'
    //       },
    //       {
    //         id: 9,
    //         name: 'Anti-allergy Serum',
    //         price: 132.90,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Byware Cosmetic',
    //         tag: null
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Real Estate',
    //     items: [
    //       {
    //         id: 6,
    //         name: 'CIC2 Skin Decode Kit',
    //         price: 690.38,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'CO., LTD Baby Girl',
    //         tag: 'New'
    //       },
    //       {
    //         id: 7,
    //         name: 'Angel Whitening Lotion',
    //         price: 132.90,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Beautiful Face',
    //         tag: 'Favorite'
    //       },
    //       {
    //         id: 8,
    //         name: 'Sunscreen Moisturizing',
    //         price: 69.04,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'CO., LTD Baby Girl',
    //         tag: 'Sold Out'
    //       },
    //       {
    //         id: 9,
    //         name: 'Anti-allergy Serum',
    //         price: 132.90,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Byware Cosmetic',
    //         tag: null
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Luxury Food',
    //     items: [
    //       {
    //         id: 6,
    //         name: 'CIC2 Skin Decode Kit',
    //         price: 690.38,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'CO., LTD Baby Girl',
    //         tag: 'New'
    //       },
    //       {
    //         id: 7,
    //         name: 'Angel Whitening Lotion',
    //         price: 132.90,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Beautiful Face',
    //         tag: 'Favorite'
    //       },
    //       {
    //         id: 8,
    //         name: 'Sunscreen Moisturizing',
    //         price: 69.04,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'CO., LTD Baby Girl',
    //         tag: 'Sold Out'
    //       },
    //       {
    //         id: 9,
    //         name: 'Anti-allergy Serum',
    //         price: 132.90,
    //         oldPrice: null,
    //         image: 'https://storage.googleapis.com/msg91-file-system/278394/szimprvt.png',
    //         vendor: 'Co., Ltd Byware Cosmetic',
    //         tag: null
    //       }
    //     ]
    //   }
    // ];
    this.categories = [
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
    this.allCategories = JSON.parse(JSON.stringify(this.categories));

    this.productService.searchText$.subscribe(search => {
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
        .filter((category: { items: any[]; }) => category.items.length > 0); // remove empty categories
    });
  }


  // ✅ Load Cart from localStorage
  loadCart() {
    const data = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : [];
  }

  // ✅ Add to Cart
  addToCart(item: any) {
    if (!this.isInCart(item)) {
      this.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    this.productService.refreshCartCount();
  }

  // ✅ Check if already in cart
  isInCart(item: any): boolean {
    console.log('Checking cart for item:', item);
    return this.cart.some(c => c.id === item.id || c.id === item);
  }


  setFilter(category: any, filter: string) {
  category.selectedFilter = filter;
}

getFilteredItems(category: any) {
  if (category.selectedFilter === 'all') {
    return category.items;
  }

  return category.items.filter(
    (item: any) => item.type === category.selectedFilter
  );
}
}
