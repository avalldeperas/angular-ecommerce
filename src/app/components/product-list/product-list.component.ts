import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("ProductListComponent - ngOnInit()");
    this.route.paramMap.subscribe(x => {
      this.listProducts();
    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.searchMode ? this.handleSearchProducts() : this.handleListProducts();
  }

  handleListProducts(){
    console.log("inside handleListProducts()");
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    this.currentCategoryId = hasCategoryId ? +this.route.snapshot.paramMap.get('id') : 1;
    this.currentCategoryName = hasCategoryId ? this.route.snapshot.paramMap.get('name') : 'Books';

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>  this.products = data
    );
  }

  private handleSearchProducts() {
    console.log("inside handleSearchProducts()");
    const keyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.getSearchProducts(keyword).subscribe(
      data => this.products = data
    );
  }

}
