import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormGroups();
  }

  private initFormGroups() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });
  }

  onSubmit() {
    const customerFormValues = this.checkoutFormGroup.get('customer').value;
    console.log("customerFormValues: ", customerFormValues);
    const shippingFormValues = this.checkoutFormGroup.get('shippingAddress').value;
    console.log("customerFormValues: ", shippingFormValues);
    const creditCardFormValues = this.checkoutFormGroup.get('creditCard').value;
    console.log("customerFormValues: ", creditCardFormValues);
  }

  copyShippingToBillingAddress(event) {
    event.target.checked ?
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value)
      : this.checkoutFormGroup.controls.billingAddress.reset();
  }
}
