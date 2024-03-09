import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationRequest } from '../authentication.request';
import { MatInput } from '@angular/material/input';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { RegisterRequest } from '../register.request';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  registerRequest: RegisterRequest = new RegisterRequest();
  
  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private axiosService: AxiosService,
    private router: Router,
    private appComponent: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }

  onLogin() {
    this.authenticationRequest.email = this.loginForm.get("email")?.value;
    this.authenticationRequest.password = this.loginForm.get("password")?.value;

    this.authenticationService.authenticateUser(this.authenticationRequest).then(responseObject => { 
      console.log(responseObject);
      console.log(responseObject.data.userDto.role);
      this.axiosService.setAuthToken(responseObject.data.token);
      this.userService.setIsAdmin(responseObject.data.userDto);
      this.appComponent.ngOnInit();
      this.router.navigateByUrl("users");
    });
  }

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
      this.appComponent.ngOnInit();
      this.router.navigateByUrl("users");
    });
  }
}
