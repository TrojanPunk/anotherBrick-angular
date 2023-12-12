import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLL_IMAGES } from 'src/shared/models/constant';
import { IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';

@Component({
  selector: 'app-feeling-lucky-dialog',
  templateUrl: './feeling-lucky-dialog.component.html',
  styleUrls: ['./feeling-lucky-dialog.component.css']
})
export class FeelingLuckyDialogComponent implements OnInit, OnDestroy {
  currentImage = '';
  filterData: FormGroup = this.fb.group({});
  selectedCategory = 'residential';
  minPrice = 4000;
  maxPrice = 5000000;
  subscriptions: Subscription[] = [];
  selectedArea = 200;

  isSearching = false;
  isAnimating = false;
  isDisplaying = false;

  displayProperties: IPropertyData[] = [];
  propertyData: IPropertyData[] = [];
  randomProperty!: IPropertyData;
  postFilterData: IPropertyData[] = [{
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
    ratings: 0,
    images: [],
    category: '',
    id: '',
    maxPrice: 0,
    minPrice: 0
  }];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogRef: MatDialogRef<FeelingLuckyDialogComponent>, private fb: FormBuilder, private propertyDataService: PropertyDataService, private router: Router) { }

  ngOnInit(): void {    
    this.filterData = this.fb.group({
      price: [0],
      features: [{bhk: [0], baths: [0], parking: [0]}],
      seller: [{sellerName: [''], sellerEmail: [''], sellerMobile: [0]}],
      location: [{city: [''], address: [''], state: [''], pincode: [0]}],
      ratings: [0],
      area: [0],
      city: [''],
      category: [''],
      minPrice: [4000],
      maxPrice: [5000000]
    });

    const formSub = this.filterData.valueChanges.subscribe(value => {
      console.log();
    });
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s?.unsubscribe());
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  filterPropertyData(): void {
    const PROPERTY = this.filterData.getRawValue();
    this.isSearching = true;
    this.changeImages();
    console.log(PROPERTY);

    this.propertyDataService.getPropertyData().subscribe({
      next: res => {
        this.propertyData = res;
        this.displayProperties = this.propertyData.filter((property) => property.category === PROPERTY.category);
        
        this.randomProperty = this.displayProperties[Math.floor(Math.random() * this.displayProperties.length)];
        console.log(this.randomProperty);
      }
    })
  }

  changeImages(index: number = 0, time: number = 40): void {
    if (index === ROLL_IMAGES.length) {
      // Reset index to 0 after all images have been shown
      index = 0;
    }
  
    this.currentImage = ROLL_IMAGES[index];
  
    if (index < ROLL_IMAGES.length - 1) {
      setTimeout(() => {
        // Call the function again with the next index after a 50ms delay
        this.changeImages(index + 1, time + 40);
      }, time);
    }

    else {
      setTimeout(() => {
        this.isSearching = false;
        this.isAnimating = true;

        setTimeout(() => {
          this.isDisplaying = true;
          this.isAnimating = false;
        }, 5000);
      }, 2000);
    }
  }
}
