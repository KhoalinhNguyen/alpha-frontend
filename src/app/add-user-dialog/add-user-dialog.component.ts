import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { User } from '../user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  user: User = new User();
  addUserForm: FormGroup;

  result: User;

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl({value:"", disabled: false}),
      lastName: new FormControl(""),
      email: new FormControl(""),
      phoneNumber: new FormControl(""),
      currentPosition: new FormControl(""),
      department: new FormControl(""),
      role: new FormControl("")
    })
  }

  closeDialog() {
      this.dialogRef.close();
    }

  
  onAddUser() {
    this.user.firstName = this.addUserForm.get("firstName")?.value;
    this.user.lastName = this.addUserForm.get("lastName")?.value;
    this.user.email = this.addUserForm.get("email")?.value;
    this.user.phoneNumber = this.addUserForm.get("phoneNumber")?.value;
    this.user.currentPosition = this.addUserForm.get("currentPosition")?.value;
    this.user.department = this.addUserForm.get("department")?.value;
    this.user.role = this.addUserForm.get("role")?.value;

    this.result = this.user;
    this.dialogRef.close(this.result);
  }
}
