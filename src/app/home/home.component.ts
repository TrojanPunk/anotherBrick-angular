import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFavoritesData, IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'ngx-skeleton-loader-demo';

  animation = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;

  searchProperty: FormGroup = this.fb.group({});
  loading = true;
  propertyData: IPropertyData[] = [];
  displayProperties: IPropertyData[] = [];
  favoritesProperties: IFavoritesData = {
    id: '',
    favorites: []
  };

  constructor(private propertyDataService: PropertyDataService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {


    this.searchProperty = this.fb.group({
      searching: ['']
    })

    this.searchProperty.valueChanges.subscribe(value => {
      console.log(value);
      this.searchingProperty(value.searching ?? '');
    })

    this.loading = true;

    this.intervalId = window.setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
      this.count = this.count === 2 ? 5 : 2;
      this.widthHeightSizeInPixels =
        this.widthHeightSizeInPixels === 50 ? 100 : 50;
    }, 5000);

    this.gettingData();
    this.fetchPropertyData();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  displayCategory(category: string) {
    this.displayProperties = this.propertyData.filter((element: IPropertyData) => element.category === category);
  }

  searchingProperty(name: string) {
    const targetName: string = (name).toLowerCase();
    this.displayProperties = this.propertyData.filter((element: IPropertyData) =>
      element.propertyName.toLowerCase().startsWith(targetName))
  }

  fetchPropertyData(): void {
    this.propertyDataService.getPropertyData().subscribe({
      next: res => {
        this.propertyData = res;
        this.propertyDataService.filteredPropertyDataSubject.next(this.propertyData);
        this.displayProperties = this.propertyData;
        setTimeout(() => {
          
          this.loading = false;
        }, 1000);
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterDialogComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}