import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyFormService} from '../../services/my-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12];
  creditCardYears: number[] = [2020, 2021, 2022, 2023];

  constructor(private formBuilder: FormBuilder,
              private myFormService: MyFormService) { }

  ngOnInit(): void {
    this.initCreditCardFormData();
    this.initFormGroups();
  }

  private initCreditCardFormData() {
    this.myFormService.getCreditCardYears().subscribe(data => {
      this.creditCardYears = data;
    });

    const startMonth = new Date().getMonth() + 1;
    this.myFormService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonths = data;
    });
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

  handleMonthAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    const startMonth = selectedYear === currentYear ? new Date().getMonth() + 1 : 1;

    this.myFormService.getCreditCardMonths(startMonth).subscribe(data => {
        this.creditCardMonths = data;
    });
  }
}
