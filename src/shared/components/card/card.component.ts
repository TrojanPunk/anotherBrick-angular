import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IFavoritesData, IFeatures, ILocation, IPropertyData, ISeller, ISignupData } from 'src/shared/models/interface';
import { FavoriteDataService } from 'src/shared/services/favorite-data.service';
import { PropertyDataService } from 'src/shared/services/property-data.service';
import { SignupDataService } from 'src/shared/services/signup-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() id: string = '';
  @Input() propertyName: string = '';
  @Input() seller!: ISeller;
  @Input() price: number = 0.0;
  @Input() ratings: number = 4.0;
  @Input() features!: IFeatures;
  @Input() location!: ILocation;
  @Input() images: string[] = [];
  @Input() category: string = '';
  @Input() area: number = 0;

  isLiked: boolean = false;
  favoritePropertyData: IPropertyData = {
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
  };

  constructor(private signupDataService: SignupDataService, private router: Router, private favoriteDataService: FavoriteDataService) { }

  randomBaths(baths: number): number {
    return Math.floor(Math.random() * baths) + 1
  }

  likeButton(id: string): void {
    if (!this.isLiked) {
      this.getUserData();
    }

    this.isLiked = !this.isLiked;
  }

  getUserData(): void {
    const ID = localStorage.getItem("userId")!;

    this.signupDataService.getUserById(ID).subscribe({
      next: res => {
        res.favorites.push(this.id);

        this.putFavoritesById(res, ID)
      },
      error: err => console.log(err)
    })
  }

  putFavoritesById(putData: ISignupData, userId: string): void {
    this.signupDataService.putFavoritesData(putData, userId).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  checkNavbar(): string {
    const URL = this.router.url;
    return URL
  }
}
