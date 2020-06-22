import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {} as Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.listProductDetails());
  }

  private listProductDetails() {
    const hasId: boolean = this.route.snapshot.paramMap.has('id');
    if (!hasId) {
      this.router.navigateByUrl('products');
    }

    const id: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductDetails(id).subscribe(
      data => {
        this.product = data;
        console.log("product data = ", data);
      }
    );

  }
}
