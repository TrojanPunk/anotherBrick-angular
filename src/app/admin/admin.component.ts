import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userId: string | null = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  checkAccessToken(): void {
    const TOKENS = JSON.parse(localStorage.getItem("accessTokens")!);
    const IS_AUTHENTICATED = TOKENS.indexOf((element: {id: string, accessToken: string}) => {
      element.id == this.userId;
    });

    if (!IS_AUTHENTICATED){
      alert("Chutiye kidahr ghus raha hai laude?!")
    }
  }

  getUserById() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      this.userId = params.get('id');
    });
  }
}
