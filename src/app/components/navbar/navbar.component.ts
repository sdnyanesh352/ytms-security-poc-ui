import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;

  ngOnInit(): void {
    // this.isLoggedIn = this.login.isLoggedIn();
    // this.user = this.login.getUser();
  }
}
