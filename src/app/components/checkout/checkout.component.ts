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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.handleFormGroup();
  }

  private handleFormGroup() {
    this.checkoutFormGroup = new FormGroup({
      customer: new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl()
      })
    });
  }

  onSubmit() {
    const customerFormValues = this.checkoutFormGroup.get('customer').value;
    console.log("firstName = ", customerFormValues);
  }
}
