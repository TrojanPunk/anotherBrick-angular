import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { avatars } from 'src/shared/models/constant';
import { IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';

@Component({
  selector: 'app-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.css']
})
export class PropertyDisplayComponent implements OnInit {
  propertyId: string | null = "";
  propertyData!: IPropertyData;
  loading = true;
  avatar = "";
  reviews = 0;
  years = 0;

  constructor(private activatedRoute: ActivatedRoute, private propertyDataService: PropertyDataService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getDataById();

    this.avatar = this.randomImage();
    this.years = this.randomYears();
    this.reviews = this.randomReviews();
  }

  getDataById(): void {
    this.getIdFromParams();

    this.propertyDataService.getPropertyById(this.propertyId).subscribe({
      next: res => {
        this.propertyData = res

        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },
      error: err => console.log(err)
    })
  }

  getIdFromParams(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.propertyId = params.get('id');
    });
  }

  randomImage(): string {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  randomYears(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  randomReviews(): number {
    return Math.floor(Math.random() * 4500) + 50;
  }

  mailTo(): void {
    window.open(`mailto:${this.propertyData.seller.sellerEmail}?subject=Query regarding the property ${this.propertyData.propertyName}&body=Hi ${this.propertyData.seller.sellerName},%0AI came across your listing for ${this.propertyData.propertyName} and am interested in learning more. Kindly provide additional details about the property, such as:%0A%091. Asking price%0A%092. Availibility for viewing%0A%093. Property tax and maintenance costs%0A%094. Proximity of stores and malls%0A%095. Transportation connectivity.%0A%0AAny additional relevant information is appreciated.
    %0A%0ABest regards,%0A[Name]%0A[Mobile Number]`);
  }
}
