import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : User[] | undefined;
  userToAdd!: User;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "first name", "last name","email","phone number", "current position","department", "action"]
  

  constructor(
    private userService: UserService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.userService.getAllUser()
      .subscribe(list => {
        console.log(list);
        this.userList = list;
        this.dataSource = new MatTableDataSource(this.userList)
      });
  }

  //Method to open a dialog
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(userInfo => {
      console.log(userInfo);
      this.userToAdd = userInfo
    })
  }
}
