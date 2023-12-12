import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICityIcons, IFavoritesData, IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeelingLuckyDialogComponent } from 'src/shared/components/feeling-lucky-dialog/feeling-lucky-dialog.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

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
  cities: string[] = [];
  cityIcons: ICityIcons[] = [];

  intervalId: number | null = null;

  searchProperty: FormGroup = this.fb.group({});
  locationSearch: FormGroup = this.fb.group({});

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

    this.locationSearch = this.fb.group({
      citySearch: ['']
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

  locationFilter(event: any): void {
    const CITY = event.value
    console.log(CITY);

    this.displayProperties = this.propertyData.filter((element: IPropertyData) => element.location.city === CITY);
    console.log(this.displayProperties);
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

        this.displayProperties.map((property) => {
          if (!this.cities.includes(property.location.city)) {
            this.cities.push(property.location.city);

            switch (property.location.city) {
              case 'Hyderabad':
                this.cityIcons.push({ 'icon': 'assets/images/charminar.png', 'city': property.location.city });
                break;

              case 'Kolkata':
                this.cityIcons.push({ 'icon': 'assets/images/howrah.png', 'city': property.location.city })
                break;

              case 'Mumbai':
                this.cityIcons.push({ 'icon': 'assets/images/gateway.png', 'city': property.location.city })
                break;

              case 'Delhi':
                this.cityIcons.push({ 'icon': 'assets/images/india-gate.png', 'city': property.location.city })
                break;

              case 'Lucknow':
                this.cityIcons.push({ 'icon': 'assets/images/mosque.png', 'city': property.location.city })
                break;

              case 'Bangalore':
                this.cityIcons.push({ 'icon': 'assets/images/palace.png', 'city': property.location.city })
                break;

              case 'Chennai':
                this.cityIcons.push({ 'icon': 'assets/images/akshardham.png', 'city': property.location.city })
                break;

              default:
                this.cityIcons.push({ 'icon': 'assets/images/howrah.png', 'city': property.location.city })
                break;
            }
          }
        })

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

  sortCities(): void {
    this.cities.sort(function (x, y) {
      if (x < y) {
        return -1;
      }

      if (x > y) {
        return 1
      }
      return 0
    })
  }

  openWheelDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FeelingLuckyDialogComponent, {
      width: '800px',
      height: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}