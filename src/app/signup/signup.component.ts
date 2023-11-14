import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPostSignUpData, ISignupData } from 'src/shared/models/interface';
import { SignupDataService } from 'src/shared/services/signup-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData: FormGroup = this.fb.group({})
  postSignupData: IPostSignUpData = {
    username: "",
    email: "",
    password: "",
    roles: [""]
  };

  constructor(private signupDataService: SignupDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupData = this.fb.group({
      username: [""],
      email: [""],
      password: [""],
      roles: [""]
    })
  }

  addUser(): void {
    const POST_DATA: ISignupData = this.signupData.getRawValue();
    console.log(this.postSignupData, POST_DATA);
    this.postSignupData.username = POST_DATA.username;
    this.postSignupData.email = POST_DATA.email;
    this.postSignupData.password = POST_DATA.password;
    this.postSignupData.roles = [];
    this.postSignupData.roles.push(POST_DATA.roles);
    console.log(this.postSignupData)

    this.signupDataService.postSignupData(this.postSignupData).subscribe(
      {
        next: (res) => {
          console.log(res);
        },  
        error: error => alert('error' + error)
      },
    );
  }
}
