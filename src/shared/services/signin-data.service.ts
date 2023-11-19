import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISigninData, ISignupData } from '../models/interface';
import { API_SIGNIN_URL } from '../models/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninDataService {

  constructor(private http: HttpClient) { }

  postSigninData(postData: ISigninData): Observable<ISignupData> {
    return this.http.get<ISignupData>(API_SIGNIN_URL + "?username=" + postData.username + "&password=" + postData.password);
  }
}
