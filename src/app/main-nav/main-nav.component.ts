import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationRequest } from '../authentication.request';
import { AxiosService } from '../axios.service';
import { UserService } from '../user.service';
import { LoginComponent } from '../login/login.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { RegisterRequest } from '../register.request';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  loggedIn: Boolean;
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  registerRequest: RegisterRequest = new RegisterRequest();
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private axiosService: AxiosService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.isLoggedIn();
    console.log(this.loggedIn);
    
  }

  private breakpointObserver = inject(BreakpointObserver);

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  onLogOut() {
    this.router.navigateByUrl("home");
    this.authenticationService.logOut();
    this.ngOnInit();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    openRegisterDialog() {
      const dialogRef = this.dialog.open(RegisterDialogComponent);
  
      dialogRef.afterClosed().subscribe(registerInfo => {
        console.log(registerInfo);
        if(registerInfo) {
        this.registerUser(registerInfo);
        }
      })
    }
  
    registerUser(registerRequest: RegisterRequest) {
      registerRequest.role = "USER";
      this.authenticationService.registerUser(registerRequest).then(responseObject => {
        console.log(responseObject);
        this.axiosService.setAuthToken(responseObject.data.token);
        this.userService.setIsAdmin(responseObject.data.userDto);
        this.goToPage("users");
        this.ngOnInit();
      });
    }

    openLoginDialog() {
      const dialogRef = this.dialog.open(LoginComponent);
  
      dialogRef.afterClosed().subscribe(loginInfo => {
        console.log(loginInfo);
        if(loginInfo) {
        this.authenticateUser(loginInfo);
        }
      })
    }
  
    authenticateUser(loginInfo: AuthenticationRequest) {
      this.authenticationService.authenticateUser(loginInfo).then(responseObject => {
        this.axiosService.setAuthToken(responseObject.data.token);
        this.userService.setIsAdmin(responseObject.data.userDto);
        this.router.navigateByUrl("users");
        this.ngOnInit();
      })
    }
}
