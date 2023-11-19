import { AfterViewInit, Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { avatars } from 'src/shared/models/constant';
import { IPropertyData } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.css']
})
export class PropertyDisplayComponent implements OnInit, AfterViewInit {
  propertyId: string | null = "";
  propertyData!: IPropertyData;
  loading: boolean = true;
  map!: L.Map;
  centroid: L.LatLngExpression = [42.3601, -71.0589];
  
  lat = (Math.random() * 78.480272) + 78.460272;
  long = (Math.random() * 17.424933) + 17.417921;

  constructor(private activatedRoute: ActivatedRoute, private propertyDataService: PropertyDataService) { }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(this.centroid);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  ngOnInit(): void {
    this.loading = true;
    this.getDataById();
    
  }

  getDataById(): void {
    this.getIdFromParams();

    this.propertyDataService.getPropertyById(this.propertyId!).subscribe({
      next: res => {
        this.propertyData = res
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

  randomImage(): string {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  randomYears(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  randomReviews(): number {
    return Math.floor(Math.random() * 4500) + 50;
  }

  randomLocation(): string {
    console.log(this.lat, this.long);
    let mapstring = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3814.9189152242893!2d50!3d70!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700217044209!5m2!1sen!2sin`
    console.log(mapstring);
    return mapstring;
  
  }
  
  
}
