import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PropertyDataService } from 'src/shared/services/property-data.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent {
  userId: string | null = "";

  ngOnInit(): void {
    this.getUserById();
    this.fetchPropertyData();
  }

  constructor(private activatedRoute: ActivatedRoute, private propertyDataService: PropertyDataService) { }

  getUserById(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      this.userId = params.get('id');
    });
  }

  fetchPropertyData(): void {
    this.propertyDataService.getPropertyData().subscribe({
      next: (res) => {
        console.log(res);
      },

      error: err => alert("There has been an error!")
    })
  }
}
