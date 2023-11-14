import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IFeatures, ILocation, ISeller } from 'src/shared/models/interface';
import { PropertyDataService } from 'src/shared/services/property-data.service';

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

  constructor(private propertyDataService: PropertyDataService, private router: Router) { }

  randomBaths(baths: number): number {
    return Math.floor(Math.random() * baths) + 1
  }
}
