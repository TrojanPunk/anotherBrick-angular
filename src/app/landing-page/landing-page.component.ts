import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninDataService } from 'src/shared/services/signin-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {
  signinForm: FormGroup = this.fb.group({});
  isWrong = false;
  userRole = '';

  constructor(private fb: FormBuilder, private signinDataService: SigninDataService, private router: Router) { }

  ngOnInit(): void {
    if(window.innerWidth > 576) {
      window.scrollTo(0, 50);
    }
    else {
      scrollTo(0, 0);
    }

    this.isWrong = false;
    
      this.signinForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
  }

  submitSignin(): void {
    const POST_DATA = this.signinForm.getRawValue();

    try {
      this.signinDataService.postSigninData(POST_DATA).subscribe({
        
        next: res => {
          localStorage.setItem('userId', res.id);
          localStorage.setItem('role', res.roles);

          if (res && res.roles == 'buyer') {
            this.router.navigate(['/home']);
          }

          else if (res && res.roles == 'seller') {
            this.router.navigate(['/seller']);
          }

          else {
            this.checkCredentials();
          }
        },

        error: err => {
          console.log(err);
          this.checkCredentials();
        }
      })
      
      throw new TypeError("hello");
    }

    catch(e) {
      setTimeout(() => {
        this.checkCredentials();
      }, 1000);
    }
  }

  checkCredentials(): boolean {
    this.isWrong = true;
    return this.isWrong;
  }
}
