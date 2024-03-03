import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { User } from '../user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  editUserForm: FormGroup;
  user: User = new User();
  result: User;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editUserForm = new FormGroup({
      firstName: new FormControl({value: this.data.firstName, disabled: false}),
      lastName: new FormControl(this.data.lastName),
      email: new FormControl(this.data.email),
      phoneNumber: new FormControl(this.data.phoneNumber),
      currentPosition: new FormControl(this.data.currentPosition),
      department: new FormControl(this.data.department),
      role: new FormControl(this.data.role)
    })
  }

  onEditUser() {
    this.user.id = this.data.id;
    this.user.firstName = this.editUserForm.get("firstName")?.value;
    this.user.lastName = this.editUserForm.get("lastName")?.value;
    this.user.email = this.editUserForm.get("email")?.value;
    this.user.phoneNumber = this.editUserForm.get("phoneNumber")?.value;
    this.user.currentPosition = this.editUserForm.get("currentPosition")?.value;
    this.user.department = this.editUserForm.get("department")?.value;
    this.user.role = this.editUserForm.get("role")?.value;

    this.result = this.user;
    this.dialogRef.close(this.result);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
