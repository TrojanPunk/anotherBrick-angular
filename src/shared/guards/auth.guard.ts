import { inject } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const ROUTER = new Router();
  const CURRENT_PATH = route.url[0].path;
  const USER_ID = localStorage.getItem('userId');
  
  if (USER_ID) {
    return true;
  }

  else {
    window.location.href = "/";
    return false
  }

};