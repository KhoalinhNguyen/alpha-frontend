import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationRequest } from '../authentication.request';
import { MatInput } from '@angular/material/input';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  
  constructor(
    private authenticationService: AuthenticationService
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
}
