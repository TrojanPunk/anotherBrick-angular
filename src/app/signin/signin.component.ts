import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IGetUserAccessToken, IPostSignUpData, ISigninData, ISignupData } from 'src/shared/models/interface';
import { SigninDataService } from 'src/shared/services/signin-data.service';
import { SignupDataService } from 'src/shared/services/signup-data.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinData: FormGroup = this.fb.group({});
  data: IGetUserAccessToken = {
    id: "",
    email: "",
    roles: [],
    accessToken: "",
    tokenType: "",
    username: ""
  };

  constructor(private signinDataService: SigninDataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("accessTokens", JSON.stringify([]));
    this.signinData = this.fb.group({
      username: [""],
      password: [""]
    })
  }

  saveToLocalStorage(ID: string, ACCESS_TOKEN: string, ROLE: string) {
    let accessTokens = {id: ID, accessToken: ACCESS_TOKEN, roles: ROLE};
    localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
  }
}
