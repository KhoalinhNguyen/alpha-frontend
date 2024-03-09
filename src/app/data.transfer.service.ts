import { Injectable, EventEmitter } from '@angular/core';

//Service to share data between class (now the role is being shared)
@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  roleChanged: EventEmitter<any> = new EventEmitter();
  role: any;

  constructor() { }

  get data() {
    return this.role;
  }
  set data(val: any) {
    this.role = val;
    this.roleChanged.emit(val);
  }
}
