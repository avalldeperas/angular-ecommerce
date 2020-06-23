import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(data =>
      this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(data =>
      this.totalQuantity = data
    );


    this.cartService.computeCartTotals();
  }

  incrementQuantity(tempCartItem: CartItem) {
    console.log('incrementQuantity');
  }

  decrementQuantity(tempCartItem: CartItem) {
    console.log('decrementQuantity');

  }

  remove(tempCartItem: CartItem) {
    console.log("remove");
  }
}
