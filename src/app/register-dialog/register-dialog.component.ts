import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterRequest } from '../register.request';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerRequest: RegisterRequest = new RegisterRequest();

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>
  ) {}
  
  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = new FormGroup( {
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  onRegisterUser() {
    this.registerRequest.email = this.registerForm.get("email")?.value;
    this.registerRequest.password = this.registerForm.get("password")?.value;

    this.dialogRef.close(this.registerRequest);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
