import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ISignupData } from 'src/shared/models/interface';
import { SignupDataService } from 'src/shared/services/signup-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData: FormGroup = this.fb.group({})
  selectedCategory: string = 'buyer';
  postSignupData: ISignupData = {
    id: "",
    username: "",
    email: "",
    password: "",
    roles: "",
    favorites: []
  };

  constructor(private signupDataService: SignupDataService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupData = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", Validators.required],
      password: ["", [Validators.required]],
      roles: [""]
    })
  }

  addUser(): void {
    const POST_DATA: ISignupData = this.signupData.getRawValue();
    POST_DATA.favorites = [];

    this.signupDataService.postSignupData(POST_DATA).subscribe(
      {
        next: (res) => {
          console.log(res);
          
        },  
        error: error => console.log("code works!")
      },
    );
    this.openSnackBar(POST_DATA.username)
    setTimeout(() => {
    }, 3000);
    this.router.navigate(['/']);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  openSnackBar(username: string) {
    this._snackBar.open('User created', username, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}
