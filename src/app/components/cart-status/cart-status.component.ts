import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartProducts = {} as Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
