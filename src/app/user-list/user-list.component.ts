import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : User[] | undefined;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "first name", "last name","email","phone number", "current position","department", "action"]
  

  constructor(
    private userService: UserService,
    private dialog: MatDialog    
  ) {}

  ngOnInit() {
    this.userService.getAllUser()
      .subscribe(list => {
        this.userList = list;
        this.dataSource = new MatTableDataSource(this.userList)
      });
  }

  //Method to open a dialog
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(userInfo => {
      this.addUser(userInfo);
    })
  }

  //data = Json object = user object, data is kex for MatDialogConfig
  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {data: user});

    dialogRef.afterClosed().subscribe(userInfo => {
      console.log(userInfo);
      this.editUser(userInfo);
    })
  }
  editUser(user: User) {
    return this.userService.editUser(user).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      }
    );
  }

  deleteUser(id: number) {
    console.log(id);
    
    return this.userService.deleteUser(id).subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  addUser(user: User) {
    user.role = "USER";
    return this.userService.addNewUser(user).subscribe(
      res => {
        //console.log(res);
        this.ngOnInit();
      }
    );
  }

}
