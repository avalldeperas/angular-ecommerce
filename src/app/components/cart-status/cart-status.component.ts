import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus() {
    this.cartService.totalQuantity.subscribe(data =>
      this.totalQuantity = data
    );
    this.cartService.totalPrice.subscribe(data =>
      this.totalPrice = data
    );
  }

  checkCartDetails() {
    console.log("you clicked on cart icon!");
  }
}
