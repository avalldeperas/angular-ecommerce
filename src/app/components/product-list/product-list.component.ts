import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId = 1;
  previousCategoryId = 1;
  currentCategoryName: string;
  searchMode = false;

  // pagination properties
  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

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

    // check if we have a different category than previous, because angular reuses components that are displayed
    //  =  ? 1 : this.pageNumber;
    if (this.previousCategoryId != this.currentCategoryId) {
      console.log("previousCategoryId = " + this.previousCategoryId + " || currentCategoryId = " + this.currentCategoryId);
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      this.processResult()
    );
  }

  private handleSearchProducts() {
    console.log("inside handleSearchProducts()");
    const keyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.getSearchProducts(keyword).subscribe(
      data => this.products = data
    );
  }

  private processResult() {
    return data => {
      this.products = data._embedded.products;
      console.log("page data = ", data.page);
      this.pageNumber = data.page.number + 1; // 0 and 1 based.
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
}

