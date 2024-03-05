import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationRequest } from '../authentication.request';
import { MatInput } from '@angular/material/input';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { RegisterRequest } from '../register.request';

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
    private dialog: MatDialog
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

    this.authenticationService.authenticateUser(this.authenticationRequest);
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe(registerInfo => {
      console.log(registerInfo);
        
      this.registerUser(registerInfo);
    })
  }

  registerUser(registerRequest: RegisterRequest) {
    registerRequest.role = "USER";
    this.authenticationService.registerUser(registerRequest);
  }

}
