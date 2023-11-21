import { CanActivateFn } from '@angular/router';

export const authSellerGuard: CanActivateFn = (route, state) => {
  const USER_ID = localStorage.getItem('userId');
  
  if (USER_ID) {
    return true;
  }

  else {
    window.location.href = "/";
    return false
  }

};
