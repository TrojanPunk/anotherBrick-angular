import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { API_GET_FILTERED_PROPERTIES_URL, API_GET_PROPERTIES_URL, API_POST_SELL_PROPERTY_URL } from '../models/constant';
import { IFilterData, IPostPropertyData, IPropertyData } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyDataService {
  filteredPropertyDataSubject = new BehaviorSubject<IPropertyData[]>([]);

  constructor(private http: HttpClient) {  }

  getPropertyData(): Observable<IPropertyData[]> {
    return this.http.get<IPropertyData[]>(API_GET_PROPERTIES_URL);
  }

  getFilteredData(filterParams: IPropertyData[]): Observable<IPropertyData[]> {
    console.log(filterParams[0].category, filterParams[0].area, filterParams[0].minPrice, filterParams[0].maxPrice);
    return this.http.get<IPropertyData[]>(API_GET_FILTERED_PROPERTIES_URL + '?category=' + filterParams[0].category + '&area=' + filterParams[0].area + '&minPrice=' + filterParams[0].minPrice + '&maxPrice=' + filterParams[0].maxPrice);
  }

  getPropertyById(id: string): Observable<IPropertyData> {
    return this.http.get<IPropertyData>(API_GET_PROPERTIES_URL + "/" + id);
  }

  postPropertyData(postData: IPostPropertyData): Observable<IPostPropertyData> {
    return this.http.post<IPostPropertyData>(API_POST_SELL_PROPERTY_URL, postData);
  }
}
