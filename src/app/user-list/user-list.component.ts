import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : User[] | undefined;
  isAdmin: Boolean;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "first name", "last name","email","phone number", "current position","department", "action"];
  

  constructor(
    private userService: UserService,
    private dialog: MatDialog  ) {}

  ngOnInit() {
    this.isAdmin = (this.userService.getIsAdmin() == "true");
    console.log("user list");
      
    this.userService.getAllUser()
      .then(list => {
        console.log(list.data);
        
        this.userList = list.data;
        this.dataSource = new MatTableDataSource(this.userList)
      });
  }

  //Method to open a dialog
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(userInfo => {
      if(userInfo){
      this.addUser(userInfo);
      }
    })
  }

  //data = Json object = user object, data is kex for MatDialogConfig
  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {data: user});

    dialogRef.afterClosed().subscribe(userInfo => {
      console.log(userInfo);
      if(userInfo) {
      this.editUser(userInfo);
      }
    })
  }
  async editUser(user: User) {
    const res = await this.userService.editUser(user);
    console.log(res);
    this.ngOnInit();
  }

  async deleteUser(id: number) {
    console.log(id);
    
    const res = await this.userService.deleteUser(id);
    this.ngOnInit();
    /*this.userService.deleteUser(id).subscribe(
      res => {
        this.ngOnInit();
      }
    );*/
  }

  async addUser(user: User) {
    user.role = "USER";
    const res = await this.userService.addNewUser(user);
    //console.log(res);
    this.ngOnInit();
  }

}
