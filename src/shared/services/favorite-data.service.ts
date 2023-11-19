import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IFavoritesData } from '../models/interface';
import { HttpClient } from '@angular/common/http';
import { API_ADD_FAVORITRES_URL, API_GET_FAVORITRES_USER_URL, API_POST_FAVORITRES_URL } from '../models/constant';

@Injectable({
  providedIn: 'root'
})
export class FavoriteDataService {
  favoritesSubject = new BehaviorSubject<IFavoritesData>({
    id: '',
    favorites: []
  })

  constructor(private http: HttpClient) { }

  putFavoritesData(putData: IFavoritesData): Observable<IFavoritesData> {
    return this.http.put<IFavoritesData>(API_ADD_FAVORITRES_URL, putData);
  }

  postFavoritesData(postData: IFavoritesData): Observable<IFavoritesData> {
    return this.http.post<IFavoritesData>(API_POST_FAVORITRES_URL, postData);
  }

  getUserById(id: string): Observable<IFavoritesData> {
    return this.http.get<IFavoritesData>(API_GET_FAVORITRES_USER_URL + "/" + id);
  }
}
