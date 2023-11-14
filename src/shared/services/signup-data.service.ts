import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostSignUpData, ISigninData, ISignupData } from '../models/interface';
import { API_GET_USER_URL, API_SIGNIN_URL, API_SIGNUP_URL } from '../models/constant';

@Injectable({
  providedIn: 'root'
})
export class SignupDataService {

  constructor(private http: HttpClient) { }

  postSignupData(postData: IPostSignUpData) {
    return this.http.post(API_SIGNUP_URL, postData);
  }

  getSignupData() {
    return this.http.get(API_GET_USER_URL);
  }
}
