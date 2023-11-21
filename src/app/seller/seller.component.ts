import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PATTERN, PROPERTY_IMAGES, sellerCardInfo } from 'src/shared/models/constant';
import { IPostPropertyData, IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  sellForm: FormGroup = this.fb.group({});
  sellerCardInfo: any = sellerCardInfo

  postSellPropertyData: IPostPropertyData[] = [{
    propertyName: '',
    seller: {
      sellerEmail: '',
      sellerMobile: 0,
      sellerName: ''
    },
    location: {
      city: '',
      state: '',
      address: '',
      pincode: 0
    },
    features: {
      bhk: 0,
      parking: 0,
      baths: 0
    },
    area: 0,
    price: 0,
    ratings: parseFloat((Math.random() < 0.5 ? ((1 - Math.random()) * (4.7 - 3.5) + 3.5) : (Math.random() * (4.7 - 3.5) + 3.5)).toFixed(1)),
    images: this.randomImageSet(),
    category: ''
  }];

  constructor(private fb: FormBuilder, private propertyDataService: PropertyDataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if(!window.localStorage.getItem('userId')) {
      window.location.href = "";
    }

    this.sellForm = this.fb.group({
      price: [0, [Validators.required]],
      bhk: [0, [Validators.required]], baths: [0, [Validators.required]], parking: [0, [Validators.required]],
      sellerName: ['', [Validators.required]], sellerEmail: ['', [Validators.required, Validators.email]], sellerMobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      city: ['', [Validators.required]], address: ['', [Validators.required]], state: ['', [Validators.required]], pincode: [0, [Validators.required]],
      ratings: [0, [Validators.required]],
      area: [0, [Validators.required]],
      propertyName: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  postSellProperty(): void {
    const FORM_DATA = this.sellForm.getRawValue();
    this.postSellPropertyData[0].area = FORM_DATA.area;
    this.postSellPropertyData[0].price = FORM_DATA.price;
    this.postSellPropertyData[0].category = FORM_DATA.category;
    this.postSellPropertyData[0].propertyName = FORM_DATA.propertyName;
    this.postSellPropertyData[0].features.bhk = FORM_DATA.bhk;
    this.postSellPropertyData[0].features.baths = FORM_DATA.baths;
    this.postSellPropertyData[0].features.parking = FORM_DATA.parking;
    this.postSellPropertyData[0].location.city = FORM_DATA.city;
    this.postSellPropertyData[0].location.pincode = FORM_DATA.pincode;
    this.postSellPropertyData[0].location.address = FORM_DATA.address;
    this.postSellPropertyData[0].location.state = FORM_DATA.state;
    this.postSellPropertyData[0].seller.sellerName = FORM_DATA.sellerName;
    this.postSellPropertyData[0].seller.sellerMobile = FORM_DATA.sellerMobile;
    this.postSellPropertyData[0].seller.sellerEmail = FORM_DATA.sellerEmail;

    this.propertyDataService.postPropertyData(this.postSellPropertyData[0]).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        console.log(err);
        this.openSnackBar();
      }
    })
  }

  disableInputs(event: any): void {
    const category = event.value;
    if (category === 'commercial') {
      this.sellForm.controls['bhk'].disable();
      this.sellForm.controls['parking'].disable(); this.sellForm.controls['baths'].disable();
    } 
    
    else {
      this.sellForm.controls['bhk'].enable();
      this.sellForm.controls['parking'].enable();
      this.sellForm.controls['baths'].enable();
    }
  }

  randomImageSet(): string[] {
    return PROPERTY_IMAGES[Math.floor(Math.random() * PROPERTY_IMAGES.length)]
  }

  openSnackBar(): void {
    this._snackBar.open('Posted property', 'data', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  validateNumber(control: AbstractControl) : {[key: string] : boolean} | null {
    if (PATTERN.test(control.value)) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }
}
