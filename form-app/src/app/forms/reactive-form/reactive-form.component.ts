import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyMedium } from '../models/customer-model';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  public deliveryForm: FormGroup;
  public notifyMedium: typeof NotifyMedium = NotifyMedium;
  public phoneControl: AbstractControl;
  public emailControl: AbstractControl;
  public countryCodeControl: AbstractControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      streetNumber: '',
      zipcode: ['', [Validators.pattern('^[0-9]{4}$'), Validators.required]],
      countryCode: '',
      keepNotified: false,
      notifyMedium: this.notifyMedium.EMAIL,
      phoneNumber: '',
    });
    this.phoneControl = this.deliveryForm.get('phoneNumber');
    this.emailControl = this.deliveryForm.get('email');
  }

  public saveDeliveryForm(): void {
    console.log(this.deliveryForm.getRawValue());
    console.log("save succeeded");
  }

  public updatePackageTrace(event: any): void {
    if (event?.target?.checked) {
      this.updateNotifyMedium(this.deliveryForm.get('notifyMedium').value);
    } else {
      this.clearValidatorsForDeliveryForm();
      this.updateValidatorsForDeliveryForm();
    }
  }

  private clearValidatorsForDeliveryForm(): void {
    this.phoneControl.clearValidators();
    this.emailControl.clearValidators();
  }

  private updateValidatorsForDeliveryForm(): void {
    this.emailControl.updateValueAndValidity();
    this.phoneControl.updateValueAndValidity();
  }



  public updateNotifyMedium(notifyMedium: NotifyMedium): void {
    this.clearValidatorsForDeliveryForm();

    switch (notifyMedium) {
      case NotifyMedium.PHONE:
        this.phoneControl.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(12)]);
        break;
      default:
        this.emailControl.setValidators([Validators.required, Validators.minLength(5), Validators.email]);
        break;
    }

    this.updateValidatorsForDeliveryForm();
  }

}
