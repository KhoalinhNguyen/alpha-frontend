import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationRequest } from '../authentication.request';
import { RegisterRequest } from '../register.request';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>
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
  
    this.dialogRef.close(this.authenticationRequest);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

/*   onLogin() {
    this.authenticationRequest.email = this.loginForm.get("email")?.value;
    this.authenticationRequest.password = this.loginForm.get("password")?.value;

    this.authenticationService.authenticateUser(this.authenticationRequest).then(responseObject => { 
      console.log(responseObject);
      console.log(responseObject.data.userDto.role);
      this.axiosService.setAuthToken(responseObject.data.token);
      this.userService.setIsAdmin(responseObject.data.userDto);
      this.mainNav.ngOnInit();
      this.router.navigateByUrl("users");
    });
  } */

/*   openRegisterDialog() {
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
      this.mainNav.ngOnInit();
      this.router.navigateByUrl("users");
    });
  } */
}
