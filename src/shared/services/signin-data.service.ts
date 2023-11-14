import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISigninData } from '../models/interface';
import { API_SIGNIN_URL } from '../models/constant';

@Injectable({
  providedIn: 'root'
})
export class SigninDataService {

  constructor(private http: HttpClient) { }

  postSigninData(postData: ISigninData) {
    return this.http.post(API_SIGNIN_URL, postData);
  }
}
