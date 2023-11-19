import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlider } from '@angular/material/slider';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFilterData, IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit, OnDestroy {
  filterData: FormGroup = this.fb.group({});
  selectedCategory: string = 'residential';
  minPrice: number = 4000;
  maxPrice: number = 5000000;
  subscriptions: Subscription[] = [];
  selectedArea: number = 200;
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

  constructor(@Inject(MAT_DIALOG_DATA) public dialogRef: MatDialogRef<FilterDialogComponent>, private fb: FormBuilder, private propertyDataService: PropertyDataService, private router: Router) { }

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
    });
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s?.unsubscribe());
  }

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + 'ft.²';
    }

    return `${value}`;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  updatePriceMin(value: number): void {
    this.minPrice = value;
  }

  updatePriceMax(value: number): void {
    this.maxPrice = value;
  }

  updateArea(value: number): void {
    this.selectedArea = value;
  }

  filterPropertyData(): void {
    
    const POST_FILTER_DATA: IPropertyData = this.filterData.getRawValue();
    this.postFilterData[0].category = POST_FILTER_DATA.category;
    this.postFilterData[0].area = POST_FILTER_DATA.area;
    this.postFilterData[0].maxPrice = POST_FILTER_DATA.maxPrice;
    this.postFilterData[0].minPrice = POST_FILTER_DATA.minPrice;
    this.postFilterData[0].price = POST_FILTER_DATA.price;

    this.getFilteredData(this.postFilterData);
  }

  getFilteredData(getFilteredData: IPropertyData[]): void {
    debugger
    this.propertyDataService.getFilteredData(getFilteredData).subscribe({
      next: (res) => {
        
        this.propertyDataService.filteredPropertyDataSubject.next(res);
      },
      error: err => console.log(err)
    })
  }
}
