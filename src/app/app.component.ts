import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alpha';

  loggedIn: Boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  
  ngOnInit(): void {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  onLogOut() {
    this.router.navigateByUrl("login");
    this.authenticationService.logOut();
    this.ngOnInit();
  }
}
