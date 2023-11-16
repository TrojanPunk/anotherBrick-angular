import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sellerCardInfo } from 'src/shared/models/constant';
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
    images: ["https://a0.muscache.com/im/pictures/e7cddd94-2caa-4c08-aa6f-d21da6187571.jpg?im_w=960", "https://a0.muscache.com/im/pictures/ddb8242c-2d0d-496e-875b-1d5fc0bdb401.jpg?im_w=1200", "https://a0.muscache.com/im/pictures/34e6e322-f057-404d-8e05-34e6c5d6bc09.jpg?im_w=1200"],
    category: ''
  }];

  constructor(private fb: FormBuilder, private propertyDataService: PropertyDataService) { }

  ngOnInit(): void {
    this.sellForm = this.fb.group({
      price: [0],
      bhk: [0], baths: [0], parking: [0],
      sellerName: [''], sellerEmail: [''], sellerMobile: [0],
      city: [''], address: [''], state: [''], pincode: [0],
      ratings: [0],
      area: [0],
      propertyName: '',
      category: ['']
    });
  }

  postSellProperty(): void {
    const FORM_DATA = this.sellForm.getRawValue();
    console.log("This is the post form data", this.sellForm.getRawValue());
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
    console.log("This is post data: ", this.postSellPropertyData);

    this.propertyDataService.postPropertyData(this.postSellPropertyData[0]).subscribe({
      next: res => console.log("Data Posted!", res),
      error: err => console.log(err)
    })
  }

  disableInputs(event: any) {
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
}
