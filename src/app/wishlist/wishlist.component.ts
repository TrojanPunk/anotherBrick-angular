import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFavoritesData, IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { SignupDataService } from 'src/shared/services/signup-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  loading: boolean = true;
  propertyData: IPropertyData[] = [];
  displayProperties: IPropertyData[] = [];
  propertyIds: string[] = [];
  favoritesProperties: IFavoritesData = {
    id: '',
    favorites: []
  };

  constructor(private propertyDataService: PropertyDataService, public dialog: MatDialog, private signupDataService: SignupDataService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUserData();
  }

  displayCategory(category: string) {
    this.displayProperties = this.propertyData.filter((element: IPropertyData) => element.category === category);
  }

  fetchPropertyData(): void {
    this.propertyDataService.getPropertyData().subscribe({
      next: res => {
        this.propertyData = res;
        this.propertyDataService.filteredPropertyDataSubject.next(this.propertyData);
        this.displayProperties = this.propertyData;
        this.loading = false;
      },

      error: err => console.log(err)
    })
  }

  getUserData(): void {
    const ID = localStorage.getItem("userId")!;

    this.signupDataService.getUserById(ID).subscribe({
      next: res => {
        this.propertyIds = res.favorites;
        this.getDataById();
      },
      error: err => console.log(err)
    })
  }

  gettingData(): void {
    this.propertyDataService.filteredPropertyDataSubject.subscribe({
      next: res => this.displayProperties = res,
      error: err => console.log(err)
    })
  }

  getDataById(): void {

    this.propertyIds.forEach(element => {
      this.propertyDataService.getPropertyById(element).subscribe({
        next: res => {
          this.displayProperties.push(res);
        },
        error: err => console.log(err)
      })
    });
    this.loading = false;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterDialogComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
