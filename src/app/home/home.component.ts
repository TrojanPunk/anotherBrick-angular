import { Component } from '@angular/core';
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
export class HomeComponent {
  searchProperty: FormGroup = this.fb.group({});
  loading: boolean = true;
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

    this.loading = true;
    this.gettingData();
    this.fetchPropertyData();
  }

  displayCategory(category: string) {
    this.displayProperties = this.propertyData.filter((element: IPropertyData) => element.category === category);
  }

  searchingProperty(name: any) {
    const targetName : string = (name.target.value).toLowerCase();
    this.displayProperties = this.propertyData.filter((element : IPropertyData) =>
      element.propertyName.toLowerCase().startsWith(targetName))
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