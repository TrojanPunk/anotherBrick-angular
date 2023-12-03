import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignupData } from '../models/interface';
import { API_SIGNIN_URL, API_SIGNUP_URL, API_UPDATE_FAV_URL } from '../models/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupDataService {

  constructor(private http: HttpClient) { }

  postSignupData(postData: ISignupData): Observable<ISignupData> {
    return this.http.post<ISignupData>(API_SIGNUP_URL, postData);
  }

  getUserById(id: string | null): Observable<ISignupData> {
    return this.http.get<ISignupData>(API_SIGNIN_URL + '/' + id);
  }

  putFavoritesData(putData: ISignupData, id: string | null): Observable<ISignupData> {
    return this.http.put<ISignupData>(API_UPDATE_FAV_URL + "/" + id, putData);
  }
}
