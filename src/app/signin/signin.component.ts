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

  validateUser(): void {
    const POST_DATA: ISigninData = this.signinData.getRawValue();
    console.log(POST_DATA)

    this.signinDataService.postSigninData(POST_DATA).subscribe(
      
        (res) => {
          console.log("res", Object.values(res));
          let data = Object(res);
          const ROLE = data.roles[0];
          const ID = data.id;
          const ACCESS_TOKEN = Object(res).accessToken;
          console.log(ROLE, ID, ACCESS_TOKEN)
          this.saveToLocalStorage(ID, ACCESS_TOKEN, ROLE);

          switch (ROLE) {
            case "ROLE_ADMIN":
              this.router.navigate(["admin", ID]);
              break;
            
            case "ROLE_BUYER":
              this.router.navigate(["buyer", ID]);
              break;

            case "ROLE_SELLER":
              this.router.navigate(["seller", ID]);
              break;
            
            default:
              console.log("There has been a disaster!");
              break;
          }
        },
    );
  }

  saveToLocalStorage(ID: string, ACCESS_TOKEN: string, ROLE: string) {
    let accessTokens = {id: ID, accessToken: ACCESS_TOKEN, roles: ROLE};
    localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
  }

  checkAccessToken(ID: string): void {
    const TOKENS = JSON.parse(localStorage.getItem("accessTokens")!);
    console.log(TOKENS);
    const IS_AUTHENTICATED = TOKENS.filter((element: {id: string, accessToken: string}) => {
      console.log(element.id, ID)
      element.id == ID;
    });

    console.log(IS_AUTHENTICATED, IS_AUTHENTICATED.length, TOKENS, TOKENS.length)

    if (IS_AUTHENTICATED.id == ID){
      console.log("done")
    }

    else {
      alert("Bsdk, kidhar ghus raha hai?")
    }
  }
}
