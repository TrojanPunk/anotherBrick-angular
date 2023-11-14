import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private propertyDataService: PropertyDataService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getDataById();
  }

  getDataById(): void {
    this.getIdFromParams();
    console.log(this.propertyId);

    this.propertyDataService.getPropertyById(this.propertyId!).subscribe({
      next: res => {
        this.propertyData = res
        console.log(this.propertyData, "this is indi data!");
        this.loading = false;
      },
      error: err => console.log(err)
    })
  }

  getIdFromParams(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.propertyId = params.get('id');
    });
  }
}
