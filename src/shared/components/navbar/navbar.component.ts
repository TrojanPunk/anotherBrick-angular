import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar = false;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkNavbar();
  }

  checkNavbar(): string {
    const URL = this.router.url;
    return URL
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
  

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LogoutDialogComponent, {
      width: '320px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
